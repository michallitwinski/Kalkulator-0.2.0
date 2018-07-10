			//zmienne wczytywane kiedyś z bazy
				var tyt_stawka_cło = 74.90;
				var tyt_stawka_akcyzy_1_kg = 141.29;
				var srednia_wazona_detaliczna_cena_sprzedarzy = 687.95;
				var stawka_akcyzy_wyroby_tyt = 31.41;
				var stawka_vat = 23;
				var prog_przetępstwa = 10500;
			//Zmienne obliczane automatycznie wyroby tytoniowe
				var max_cena_detaliczna = Math.round((3*srednia_wazona_detaliczna_cena_sprzedarzy)*100)/100;
			// przypisywanie pul i przycisku do zmiennych do zmiennych tytoń
			var tyt_ilosc_kg = document.getElementById('tyt_ilosc_kg');
			var tyt_ilosc_gr = document.getElementById('tyt_ilosc_gr');
			var btn_oblicz_tyton = document.getElementById('btn_oblicz_tyton');
			var typ_przemyt = document.getElementById('typ_przemyt');
			var typ_nabycie = document.getElementById('typ_nabycie');
			//przypisanie elementu div wynik tytoń
			var wynik_1 = document.getElementById("wynik_1");
			var wynik_2 = document.getElementById("wynik_2");	
			//wywoływanie obliczneń tytoń
			tyt_ilosc_kg.addEventListener('input', obliczIloscKgTyton, false);
			tyt_ilosc_gr.addEventListener('input', obliczIloscGrTyton, false);
			btn_oblicz_tyton.addEventListener('click', obliczTyton, false);
			//funkcje dynamicznie liczące wprowadzane pola tyton
			function obliczIloscKgTyton(){
				var tyton_kg = tyt_ilosc_kg.value;
				tyt_ilosc_gr.value = tyton_kg*1000;
			}
			function obliczIloscGrTyton(){
				var tyton_gr = tyt_ilosc_gr.value;
				tyt_ilosc_kg.value = tyton_gr/1000;
				tyt_ilosc_gr.value = Math.round(tyton_gr);
			}
			// funkcja uruchamiana po naciśnięciu przycisku oblicz tytoń
			function obliczTyton(){
				
				if(tyt_ilosc_kg.value == "" || tyt_ilosc_kg.value <= 0){
					wynik_1.innerHTML = "Wypełnij poprawnie pole ilość";
					wynik_2.innerHTML = "";
				}
				else{
					wynik_1.innerHTML = "";
					wynik_2.innerHTML = "";
					//Wprowadzona ilość tytoni gr
					var ilosc_tyt = tyt_ilosc_kg.value;
					var tyt_wartosc_celna = Math.round(0.114*ilosc_tyt*1000);
					if(tyt_wartosc_celna==0) tyt_wartosc_celna=1;
					var tyt_clo = Math.round(tyt_wartosc_celna*(tyt_stawka_cło/100));
					var tyt_akcyza = Math.round((ilosc_tyt*tyt_stawka_akcyzy_1_kg)+(max_cena_detaliczna*ilosc_tyt)*(stawka_akcyzy_wyroby_tyt/100));
					var tyt_vat = Math.round((tyt_wartosc_celna+tyt_clo+tyt_akcyza)*(stawka_vat/100));
					var tyt_wartosc_szacunkowa = Math.round(srednia_wazona_detaliczna_cena_sprzedarzy*ilosc_tyt);
					var suma_naleznosci = tyt_clo+tyt_akcyza+tyt_vat;
					
					//wypisywanie dla odpowiedniego zaznaczenia przemyt/nabycie
						if(typ_przemyt.checked == false && typ_nabycie.checked == false){
							wynik_1.innerHTML = "Wybierz opcje nabycie lub przemyt!";
						}else if(typ_przemyt.checked == true){
							 wynik_1.innerHTML = "Wartość celna wynosi: "+tyt_wartosc_celna+",00 PLN<br>Cło wynosi: "+tyt_clo+",00 PLN<br>Akcyza wynosi: "+tyt_akcyza+",00 PLN<br> VAT wynosi: "+tyt_vat+",00 PLN<br> Wartość szacunkowa wynosi: "+tyt_wartosc_szacunkowa+",00 PLN<br> Suma należności wynosi: "+suma_naleznosci+",00 PLN";
							//włączenie zdarzenie na radio nabycie
							typ_nabycie.addEventListener('click',obliczTyton,false);
							//wywołanie funkcji obliczającej przestępstwo(1-przemyt, 0-Nabycie)
							wynik_2.innerHTML = sprawdzPrzestepstwoPrzemyt(tyt_akcyza,tyt_vat,tyt_clo);
						}else{
							wynik_1.innerHTML = "Akcyza wynosi: "+tyt_akcyza+",00 PLN<br>Wartość szacunkowa wynosi: "+tyt_wartosc_szacunkowa+",00 PLN";
							typ_przemyt.addEventListener('click',obliczTyton,false);
							//wywołanie funkcji obliczającej przestępstwo(1-przemyt, 0-Nabycie)
							wynik_2.innerHTML = sprawdzPrzestepstwoNabycie(tyt_akcyza);
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