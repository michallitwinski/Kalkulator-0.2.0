			//zmienne wczytywane kiedyś z bazy
				var susz_stawka_akcyzy_1_kg = 458.64;
				var prog_przetępstwa = 10500;
			//przypisanie elementu div wynik szusz
			var szusz_ilosz_kg = document.getElementById('susz_ilosc_kg');
			var susz_ilosc_gr = document.getElementById('susz_ilosc_gr');
			var btn_oblicz_susz = document.getElementById('btn_oblicz_susz');
			
			//przypisanie elementu div wynik szusz
			var wynik_1 = document.getElementById("wynik_1");
			var wynik_2 = document.getElementById("wynik_2");
			
			//wywoływanie obliczneń szusz
			szusz_ilosz_kg.addEventListener('input', obliczIloscKgSusz, false);
			susz_ilosc_gr.addEventListener('input', obliczIloscGrSusz, false);
			btn_oblicz_susz.addEventListener('click', obliczSusz, false);
			
			//funkcje dynamicznie liczące wprowadzane pola szusz
			function obliczIloscKgSusz(){
				var tyton_kg = szusz_ilosz_kg.value;
				susz_ilosc_gr.value = tyton_kg*1000;
			}
			function obliczIloscGrSusz(){
				var tyton_gr = susz_ilosc_gr.value;
				szusz_ilosz_kg.value = tyton_gr/1000;
				susz_ilosc_gr.value = Math.round(tyton_gr);
			}
			// funkcja uruchamiana po naciśnięciu przycisku oblicz
			function obliczSusz(){
				if(susz_ilosc_kg.value == "" || susz_ilosc_kg.value <= 0){
					wynik_1.innerHTML = "Wypełnij poprawnie pole ilość";
					wynik_2.innerHTML = "";
				}
				else{
					wynik_1.innerHTML = "";
					wynik_2.innerHTML = "";
					//Wprowadzona ilość tytoni gr
					var susz_ilosc = susz_ilosc_kg.value;
					var susz_akcyza = Math.round(susz_ilosc*susz_stawka_akcyzy_1_kg);
					//wypisywanie dla odpowiedniego zaznaczenia przemyt/nabycie
					wynik_1.innerHTML = "Akcyza oraz wartość szacunkowa wynosi: "+susz_akcyza+" PLN";
					//wywołanie funkcji obliczającej przestępstwo(1-przemyt, 0-Nabycie)
					wynik_2.innerHTML = sprawdzPrzestepstwoNabycie(susz_akcyza);

					}
				}
			//funkcja obliczająca przestępstwo dla nabycia docelowo inny plik
			function sprawdzPrzestepstwoNabycie(akcyza){
					var text = "Wykroczenie";
					if(akcyza>=prog_przetępstwa)
						text = '<span style="color:red;">Przestępstwo</span> - przekroczono ustawowy próg - Akcyzya';
				return text;
			}