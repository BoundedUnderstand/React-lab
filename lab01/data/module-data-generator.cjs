
const fs = require('fs');

function generateRandomBirthDate() {
    const start = new Date(1980, 0, 1);
    const end = new Date(2005, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}


function generateRandomPhone() {
    let phone = '';
    for (let i = 0; i < 9; i++) {
        phone += Math.floor(Math.random() * 10);
    }
    return `${phone.substring(0, 3)}-${phone.substring(3, 6)}-${phone.substring(6, 9)}`;
}





const count = Number(process.argv[2]); 

if (!count || count <= 0) {
    console.error("Błąd: Podaj liczbę obiektów do wygenerowania, np. 'node module-data-generator.cjs 5'.");
    
    if (!fs.existsSync('./module-data.js')) {
        console.error("UWAGA: Nie wygenerowano pliku 'module-data.js', gdyż brak poprawnej liczby obiektów.");
        process.exit(1);
    }
    
    return; 
}


fs.readFile('./data/names.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Błąd odczytu pliku names.txt:", err);
        return;
    }

    const names = data.split(/\s+/).filter(n => n.length > 0);

    if (names.length === 0) {
        console.error("Błąd: Plik names.txt jest pusty.");
        return;
    }

    const people = [];

    for (let i = 0; i < count; i++) {
        const randomName = names[Math.floor(Math.random() * names.length)];
        
        const email = `${randomName.toLowerCase()}${i + 1}@wsei.edu.pl`;
        
        people.push({
            id: i + 1,
            name: randomName,
            birthDate: generateRandomBirthDate(),
            email: email,
            phone: generateRandomPhone(),
        });
    }

    
    const content = `/** * Plik wygenerowany automatycznie przez module-data-generator.cjs
 * Liczba obiektów: ${count}
 */
export const people = ${JSON.stringify(people, null, 2)};
`;

    
    fs.writeFile('./src/data/module-data.js', content, 'utf8', (err) => {
        if (err) {
            console.error("Błąd zapisu pliku module-data.js:", err);
            return;
        }
        console.log(`module-data.js wygenerowany! Zapisano ${count} obiektów.`);
    });
});