			//Zmienne stałe !!! do wczytania z bazy kiedyś
					var spi_stawka_cło = 19.20; //procent w EURO
					var alk_stawka_akcyzy_100_procent = 5704;
					var stawka_vat = 23;
					var spi_wartość_rynkowa = 90;
					var prog_przetępstwa = 10500;
			// przypisywanie pul i przycisku do zmiennych do zmiennych spirytus	
			var spi_ilosc_l = document.getElementById('spi_ilosc_l');
			var spi_ilosc_procent = document.getElementById('spi_ilosc_procent');
			var kurs_euro = document.getElementById('kurs_euro');
			var btn_oblicz_spirytus = document.getElementById('btn_oblicz_spirytus');
			var typ_przemyt = document.getElementById('typ_przemyt');
			var typ_nabycie = document.getElementById('typ_nabycie');
			//przypisanie elementu div wynik papierosy
			var wynik_1 = document.getElementById("wynik_1");
			var wynik_2 = document.getElementById("wynik_2");
			//wywoływanie obliczneń ilości papierosów po zmianie formularzy papierosy
			btn_oblicz_spirytus.addEventListener('click', obliczSpirytus, false);
			function obliczSpirytus(){
				// Sprawdzenie czy pola edytowalne nie są puste i nie soą mniejsze od zera!!
				if(spi_ilosc_l.value == "" || spi_ilosc_l.value <= 0 || spi_ilosc_procent.value == "" || spi_ilosc_procent.value <= 0 || kurs_euro.value == "" || kurs_euro.value <= 0){
					wynik_1.innerHTML = "Wypełnij poprawnie pola";
					wynik_2.innerHTML = "";
				}else{
				//czyszczenie pól wynikowych
					wynik_1.innerHTML = "";
					wynik_2.innerHTML = "";
					//Wprowadzona ilość spirytusu
					var ilosc_l_spi = spi_ilosc_l.value;
					var procent_spi = spi_ilosc_procent.value;
					var euro_kurs = kurs_euro.value;
					//Obliczanie należności
					var spi_wartosc_celna = Math.ceil(ilosc_l_spi*17.5);
					var spi_clo = Math.round((ilosc_l_spi/100)*spi_stawka_cło*euro_kurs);
					var spi_akcyza = Math.round(ilosc_l_spi*(procent_spi/100)*(alk_stawka_akcyzy_100_procent/100));
					var spi_vat = Math.round((spi_wartosc_celna+spi_clo+spi_akcyza)*(stawka_vat/100));
					var spi_wartosc_szacunkowa = Math.round(spi_wartość_rynkowa*ilosc_l_spi);
					var suma_naleznosci = spi_clo+spi_akcyza+spi_vat;
					
					//wypisywanie dla odpowiedniego zaznaczenia przemyt/nabycie
						if(typ_przemyt.checked == false && typ_nabycie.checked == false){
							wynik_1.innerHTML = "Wybierz opcje nabycie lub przemyt!";
						}else if(typ_przemyt.checked == true){
							 wynik_1.innerHTML = "Wartość celna wynosi: "+spi_wartosc_celna+",00 PLN<br>Cło wynosi: "+spi_clo+",00 PLN<br>Akcyza wynosi: "+spi_akcyza+",00 PLN<br> VAT wynosi: "+spi_vat+",00 PLN<br> Wartość szacunkowa wynosi: "+spi_wartosc_szacunkowa+",00 PLN<br> Suma należności wynosi: "+suma_naleznosci+",00 PLN";
							//włączenie zdarzenie na radio nabycie
							typ_nabycie.addEventListener('click',obliczSpirytus,false);
							//wywołanie funkcji obliczającej przestępstwo(0-przemyt, 1-Nabycie)
							wynik_2.innerHTML = sprawdzPrzestepstwoPrzemyt(spi_akcyza,spi_vat,spi_clo);
						}else{
							wynik_1.innerHTML = "Akcyza wynosi: "+spi_akcyza+",00 PLN<br>Wartość szacunkowa wynosi: "+spi_wartosc_szacunkowa+",00 PLN";
							//włączenie zdarzenie na radio nabycie
							typ_przemyt.addEventListener('click',obliczSpirytus,false);
							//wywołanie funkcji obliczającej przestępstwo(0-przemyt, 1-Nabycie)
							wynik_2.innerHTML = sprawdzPrzestepstwoNabycie(spi_akcyza);
						}
					}
				}
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