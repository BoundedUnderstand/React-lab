// Plik musi być plikiem CJS (CommonJS), aby użyć require()
const fs = require('fs');

// Funckja do generowania losowej daty urodzenia (w formacie YYYY-MM-DD)
function generateRandomBirthDate() {
    const start = new Date(1980, 0, 1);
    const end = new Date(2005, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

// Funkcja do generowania losowego numeru telefonu (w formacie XXX-XXX-XXX)
function generateRandomPhone() {
    let phone = '';
    for (let i = 0; i < 9; i++) {
        phone += Math.floor(Math.random() * 10);
    }
    return `${phone.substring(0, 3)}-${phone.substring(3, 6)}-${phone.substring(6, 9)}`;
}


// --- GŁÓWNA LOGIKA SKRYPTU ---

// Odczyt liczby obiektów do wygenerowania (Argument skryptu)
const count = Number(process.argv[2]); 

if (!count || count <= 0) {
    console.error("Błąd: Podaj liczbę obiektów do wygenerowania, np. 'node module-data-generator.cjs 5'.");
    // Zakończ skrypt, jeśli nie podano poprawnej liczby lub jeśli plik module-data.js nie został jeszcze wygenerowany
    if (!fs.existsSync('./module-data.js')) {
        console.error("UWAGA: Nie wygenerowano pliku 'module-data.js', gdyż brak poprawnej liczby obiektów.");
        process.exit(1);
    }
    // Jeśli plik już istnieje, nie wychodzimy, tylko nie nadpisujemy, aby spełnić warunek zadania.
    return; 
}


// Odczyt pliku names.txt za pomocą fs.readFile (asynchronicznie)
fs.readFile('./names.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Błąd odczytu pliku names.txt:", err);
        return;
    }

    // Podział tekstu na tablicę imion, usunięcie pustych elementów
    const names = data.split(/\s+/).filter(n => n.length > 0);

    if (names.length === 0) {
        console.error("Błąd: Plik names.txt jest pusty.");
        return;
    }

    const people = [];

    for (let i = 0; i < count; i++) {
        // Losowe imię z tablicy
        const randomName = names[Math.floor(Math.random() * names.length)];
        
        // Generowanie maila na podstawie imienia i kolejnej liczby (i+1)
        const email = `${randomName.toLowerCase()}${i + 1}@wsei.edu.pl`;
        
        people.push({
            id: i + 1,
            name: randomName,
            birthDate: generateRandomBirthDate(),
            email: email,
            phone: generateRandomPhone(),
        });
    }

    // Konwertowanie tablicy obiektów na string w formacie JS
    const content = `/** * Plik wygenerowany automatycznie przez module-data-generator.cjs
 * Liczba obiektów: ${count}
 */
export const people = ${JSON.stringify(people, null, 2)};
`;

    // Zapis do pliku module-data.js
    fs.writeFile('./module-data.js', content, 'utf8', (err) => {
        if (err) {
            console.error("Błąd zapisu pliku module-data.js:", err);
            return;
        }
        console.log(`module-data.js wygenerowany! Zapisano ${count} obiektów.`);
    });
});