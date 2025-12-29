// Configurazione dei dadi come da tua richiesta
const diceConfig = [
    { id: 1, faces: ["U", "I", "O", "A", "O", "E"], color: "black" },   // Posizione 0 (Alto Sx)
    { id: 2, faces: ["M", "G", "E", "A", "Z", "S"], color: "orange" },  // Posizione 1 (Alto Centro)
    { id: 3, faces: ["I", "G", "S", "O", "V", "U"], color: "red" },     // Posizione 2 (Alto Dx)
    { id: 4, faces: ["D", "C", "B", "L", "T", "R"], color: "green" },   // Posizione 3 (Centro Sx)
    { id: 5, faces: ["D", "B", "N", "H", "R", "P"], color: "yellow" },  // Posizione 4 (Centro - il perno)
    { id: 6, faces: ["A", "A", "E", "E", "I", "O"], color: "green" },   // Posizione 5 (Centro Dx)
    { id: 7, faces: ["L", "C", "O", "N", "T", "R"], color: "purple" },  // Posizione 6 (Basso Sx)
    { id: 8, faces: ["N", "C", "P", "L", "M", "F"], color: "blue" },    // Posizione 7 (Basso Centro)
    { id: 9, faces: ["E", "A", "A", "E", "I", "I"], color: "pink" }     // Posizione 8 (Basso Dx)
];

const board = document.getElementById('board');
let countdown;

// Inizializza la board
function initBoard() {
    board.innerHTML = '';
    diceConfig.forEach(die => {
        const dieElement = document.createElement('div');
        dieElement.className = `die ${die.color}`;
        // Mostra una faccia a caso all'avvio
        const randomFace = die.faces[Math.floor(Math.random() * die.faces.length)];
        dieElement.textContent = randomFace;
        board.appendChild(dieElement);
    });
}

// Funzione per lanciare i dadi
function rollDice() {
    const diceElements = document.querySelectorAll('.die');
    
    // Aggiungi effetto visivo
    diceElements.forEach(d => d.classList.add('shaking'));

    // Dopo 500ms ferma l'animazione e cambia le lettere
    setTimeout(() => {
        diceElements.forEach((d, index) => {
            d.classList.remove('shaking');
            const dieData = diceConfig[index];
            const randomFace = dieData.faces[Math.floor(Math.random() * dieData.faces.length)];
            d.textContent = randomFace;
        });
        // Avvia automaticamente il timer
        startTimer();
    }, 500);
}

// Gestione Timer
function startTimer() {
    stopTimer();
    const display = document.getElementById('timerDisplay');
    const timeSpan = document.getElementById('time');
    display.style.display = 'flex';
    
    let duration = 60 * 1; // 60 secondi
    updateTimerDisplay(duration, timeSpan);

    countdown = setInterval(() => {
        duration--;
        updateTimerDisplay(duration, timeSpan);
        
        if (duration <= 0) {
            clearInterval(countdown);
            timeSpan.textContent = "TEMPO SCADUTO!";
            // Suono opzionale o alert
            alert("Tempo scaduto! Giù le penne.");
        }
    }, 1000);
}

function stopTimer() {
    if (countdown) clearInterval(countdown);
}

function updateTimerDisplay(seconds, element) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    element.textContent = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

// Gestione Tema Chiaro/Scuro
function toggleTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const currentTheme = html.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        html.setAttribute('data-theme', 'light');
        btn.textContent = '🌙'; // Icona Luna per passare a scuro
    } else {
        html.setAttribute('data-theme', 'dark');
        btn.textContent = '☀️'; // Icona Sole per passare a chiaro
    }
}

// Avvio iniziale
initBoard();