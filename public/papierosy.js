			//Zmienne stałe !!! do wczytania z bazy kiedyś
					var pap_stawka_cło = 57.60;
					var pap_stawka_akcyzy_1000_szt = 206.76;
					var srednia_wazona_detaliczna_cena_sprzedarzy = 687.95;
					var stawka_akcyzy_wyroby_tyt = 31.41;
					var stawka_vat = 23;
					var prog_przetępstwa = 10500;
			//Zmienne obliczane automatycznie wyroby tytoniowe
					var max_cena_detaliczna = Math.round((3*srednia_wazona_detaliczna_cena_sprzedarzy)*100)/100;
			// zmienna określająca pole w które wprowadzano dane papierosy
					var pap_pole = 0;
			// przypisywanie pul i przycisku do zmiennych do zmiennych papierosy
			var pap_ilosc_szt = document.getElementById('pap_ilosc_szt');
			var pap_ilosc_wpaczce = document.getElementById('pap_ilosc_wpaczce');
			var pap_ilosc_paczek = document.getElementById('pap_ilosc_paczek');
			var pap_ilosc_sztang = document.getElementById('pap_ilosc_sztang');
			var btn_oblicz_papierosy = document.getElementById('btn_oblicz_papierosy');
			var typ_przemyt = document.getElementById('typ_przemyt');
			var typ_nabycie = document.getElementById('typ_nabycie');
			//przypisanie elementu div wynik papierosy
			var wynik_1 = document.getElementById("wynik_1");
			var wynik_2 = document.getElementById("wynik_2");
			//wywoływanie obliczneń ilości papierosów po zmianie formularzy papierosy
			pap_ilosc_szt.addEventListener('input', obliczIloscSztuki, false);
			pap_ilosc_wpaczce.addEventListener('input', obliczIloscSztukiWPaczce, false);
			pap_ilosc_paczek.addEventListener('input', obliczIloscPaczki, false);
			pap_ilosc_sztang.addEventListener('input', obliczIloscSztangi, false);
			btn_oblicz_papierosy.addEventListener('click', obliczPapierosy, false);
			//funkcje dynamicznie liczące wprowadzane pola papierosy
			function obliczIloscSztuki(){
				pap_pole=1;
				var ilosc = pap_ilosc_szt.value;
				ilosc = Math.floor(ilosc);
				pap_ilosc_szt.value = ilosc;
				var ilosc_wpaczce = pap_ilosc_wpaczce.value;	
				
				var ilosc_paczek = ilosc/ilosc_wpaczce;
				pap_ilosc_paczek.value = ilosc_paczek;
				pap_ilosc_sztang.value = ilosc_paczek/10;		
			};
			function obliczIloscPaczki(){
				pap_pole =2;
				var ilosc = pap_ilosc_paczek.value;
				var ilosc_wpaczce = pap_ilosc_wpaczce.value;
				
				pap_ilosc_szt.value = ilosc*ilosc_wpaczce;
				pap_ilosc_sztang.value = ilosc/10;
			};
			function obliczIloscSztangi(){
				pap_pole = 3;
				var ilosc = pap_ilosc_sztang.value;
				var ilosc_wpaczce = pap_ilosc_wpaczce.value;
				
				pap_ilosc_szt.value = ilosc*ilosc_wpaczce*10;
				pap_ilosc_paczek.value = ilosc*10;
			};
			function obliczIloscSztukiWPaczce(){
				if(pap_pole==1)obliczIloscSztuki();
				if(pap_pole==2)obliczIloscPaczki();
				if(pap_pole==3)obliczIloscSztangi();
			};
			// funkcja uruchamiana po naciśnięciu przycisku oblicz papierosy
			function obliczPapierosy(){
				// Sprawdzenie czy pola edytowalne nie są puste i nie soą mniejsze od zera!!
				if(pap_ilosc_szt.value == "" || pap_ilosc_szt.value <= 0 || pap_ilosc_wpaczce.value == "" || pap_ilosc_wpaczce.value <= 0){
					wynik_1.innerHTML = "Wypełnij poprawnie pole ilość";
					wynik_2.innerHTML = "";
				}
				else{
					//czyszczenie pól wynikowych
					wynik_1.innerHTML = "";
					wynik_2.innerHTML = "";
					//Wprowadzona ilość papierosów
					var ilosc_pap = pap_ilosc_szt.value;
					//Obliczanie należności
					var ilosc_tys_szt = ilosc_pap/1000;
					var pap_wartosc_celna = Math.round(0.114*ilosc_tys_szt*1000);
					if(pap_wartosc_celna==0)pap_wartosc_celna=1;
					var pap_clo = Math.round(pap_wartosc_celna*(pap_stawka_cło/100));
					var pap_akcyza = Math.round((ilosc_pap*pap_stawka_akcyzy_1000_szt/1000)+(max_cena_detaliczna*ilosc_pap/1000)*(stawka_akcyzy_wyroby_tyt/100));
					var pap_vat = Math.round((pap_wartosc_celna+pap_clo+pap_akcyza)*(stawka_vat/100));
					var pap_wartosc_szacunkowa = Math.round(srednia_wazona_detaliczna_cena_sprzedarzy/1000*ilosc_pap);
					var suma_naleznosci = pap_clo+pap_akcyza+pap_vat;
					
					//wypisywanie dla odpowiedniego zaznaczenia przemyt/nabycie
						if(typ_przemyt.checked == false && typ_nabycie.checked == false){
							wynik_1.innerHTML = "Wybierz opcje nabycie lub przemyt!";
						}else if(typ_przemyt.checked == true){
							 wynik_1.innerHTML = "Wartość celna wynosi: "+pap_wartosc_celna+",00 PLN<br>Cło wynosi: "+pap_clo+",00 PLN<br>Akcyza wynosi: "+pap_akcyza+",00 PLN<br> VAT wynosi: "+pap_vat+",00 PLN<br> Wartość szacunkowa wynosi: "+pap_wartosc_szacunkowa+",00 PLN<br> Suma należności wynosi: "+suma_naleznosci+",00 PLN";
							//włączenie zdarzenie na radio nabycie
							typ_nabycie.addEventListener('click',obliczPapierosy,false);
							//wywołanie funkcji obliczającej przestępstwo(0-przemyt, 1-Nabycie)
							wynik_2.innerHTML = sprawdzPrzestepstwoPrzemyt(pap_akcyza,pap_vat,pap_clo);
						}else{
							wynik_1.innerHTML = "Akcyza wynosi: "+pap_akcyza+",00 PLN<br>Wartość szacunkowa wynosi: "+pap_wartosc_szacunkowa+",00 PLN";
							//włączenie zdarzenie na radio nabycie
							typ_przemyt.addEventListener('click',obliczPapierosy,false);
							//wywołanie funkcji obliczającej przestępstwo(0-przemyt, 1-Nabycie)
							wynik_2.innerHTML = sprawdzPrzestepstwoNabycie(pap_akcyza);
						}
					};
				};
			//funkcja obliczająca przestępstwo dla przemytu docelowo inny plik
			function sprawdzPrzestepstwoPrzemyt(akcyza,vat,clo){
					var text = "Wykroczenie";
					if(akcyza>=prog_przetępstwa){
						text = '<span style="color:red;">Przestępstwo</span> - przekroczono ustawowy próg - Akcyzya';
						if(vat>=prog_przetępstwa)
							text += ", Vat";
						if(clo>=prog_przetępstwa)
							text += " oraz Cło";
					}
				return text;
			}
			//funkcja obliczająca przestępstwo dla nabycia docelowo inny plik
			function sprawdzPrzestepstwoNabycie(akcyza){
					var text = "Wykroczenie";
					if(akcyza>=prog_przetępstwa)
						text = '<span style="color:red;">Przestępstwo</span> - przekroczono ustawowy próg - Akcyzya';
				return text;
			}