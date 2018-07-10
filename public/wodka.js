//Zmienne stałe !!! do wczytania z bazy kiedyś
					var wod_stawka_cło = 0; //procent w EURO
					var alk_stawka_akcyzy_100_procent = 5704;
					var stawka_vat = 23;
					var wod_wartość_rynkowa = 60;
					var prog_przetępstwa = 10500;
			// przypisywanie pul i przycisku do zmiennych do zmiennych spirytus	
			var wod_ilosc_l = document.getElementById('wod_ilosc_l');
			var wod_ilosc_procent = document.getElementById('wod_ilosc_procent');
			var btn_oblicz_wodka = document.getElementById('btn_oblicz_wodka');
			var typ_przemyt = document.getElementById('typ_przemyt');
			var typ_nabycie = document.getElementById('typ_nabycie');
			//przypisanie elementu div wynik papierosy to chyba jest nie potrzebne
			var wynik_1 = document.getElementById("wynik_1");
			var wynik_2 = document.getElementById("wynik_2");
			//wywoływanie obliczneń ilości papierosów po zmianie formularzy papierosy
			btn_oblicz_wodka.addEventListener('click', obliczWodka, false);
			
			function obliczWodka(){
				wynik_1.innerHTML = "Wypełnij poprawnie pola";
				// Sprawdzenie czy pola edytowalne nie są puste i nie soą mniejsze od zera!!
				if(wod_ilosc_l.value == "" || wod_ilosc_l.value <= 0 || wod_ilosc_procent.value == "" || wod_ilosc_procent.value <= 0){
					wynik_1.innerHTML = "Wypełnij poprawnie pola";
					wynik_2.innerHTML = "";
				}
				else{
					//czyszczenie pól wynikowych
					wynik_1.innerHTML = "";
					wynik_2.innerHTML = "";
					//Wprowadzona ilość spirytusu
					var ilosc_l_wod = wod_ilosc_l.value;
					var procent_wod = wod_ilosc_procent.value;
					//Obliczanie należności
					var wod_wartosc_celna = Math.ceil(ilosc_l_wod*13);
					var wod_clo = Math.round((ilosc_l_wod/100)*wod_stawka_cło);
					var wod_akcyza = Math.round(ilosc_l_wod*(procent_wod/100)*(alk_stawka_akcyzy_100_procent/100));
					var wod_vat = Math.round((wod_wartosc_celna+wod_clo+wod_akcyza)*(stawka_vat/100));
					var wod_wartosc_szacunkowa = Math.round(wod_wartość_rynkowa*ilosc_l_wod);
					var suma_naleznosci = wod_clo+wod_akcyza+wod_vat;
					
					//wypisywanie dla odpowiedniego zaznaczenia przemyt/nabycie
						if(typ_przemyt.checked == false && typ_nabycie.checked == false){
							wynik_1.innerHTML = "Wybierz opcje nabycie lub przemyt!";
						}else if(typ_przemyt.checked == true){
							 wynik_1.innerHTML = "Wartość celna wynosi: "+wod_wartosc_celna+",00 PLN<br>Cło wynosi: "+wod_clo+",00 PLN<br>Akcyza wynosi: "+wod_akcyza+",00 PLN<br> VAT wynosi: "+wod_vat+",00 PLN<br> Wartość szacunkowa wynosi: "+wod_wartosc_szacunkowa+",00 PLN<br> Suma należności wynosi: "+suma_naleznosci+",00 PLN";
							//włączenie zdarzenie na radio nabycie
							typ_nabycie.addEventListener('click',obliczWodka,false);
							//wywołanie funkcji obliczającej przestępstwo(0-przemyt, 1-Nabycie)
							wynik_2.innerHTML = sprawdzPrzestepstwoPrzemyt(wod_akcyza,wod_vat,wod_clo);
						}else{
							wynik_1.innerHTML = "Akcyza wynosi: "+wod_akcyza+",00 PLN<br>Wartość szacunkowa wynosi: "+wod_wartosc_szacunkowa+",00 PLN";
							//włączenie zdarzenie na radio nabycie
							typ_przemyt.addEventListener('click',obliczWodka,false);
							//wywołanie funkcji obliczającej przestępstwo(0-przemyt, 1-Nabycie)
							wynik_2.innerHTML = sprawdzPrzestepstwoNabycie(wod_akcyza);
						}
				}
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