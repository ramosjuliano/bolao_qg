document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch('http://localhost:3000/game');
    const gameData = await response.json();

    if (gameData) {
        const matchDisplay = document.getElementById('matchDisplay');
        matchDisplay.innerHTML = `
            ${gameData.teamA} <input type="number" id="goalsA" name="goalsA" required> x 
            <input type="number" id="goalsB" name="goalsB" required> ${gameData.teamB}
        `;
    }

    document.getElementById('betForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const bettorName = document.getElementById('bettorName').value;
        const goalsA = document.getElementById('goalsA').value;
        const goalsB = document.getElementById('goalsB').value;
        const betTime = new Date().toLocaleString();

        const betData = {
            bettorName,
            goalsA,
            goalsB,
            betTime
        };

        await fetch('http://localhost:3000/bet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(betData),
        });

        document.getElementById('result').innerText = 'Aposta registrada com sucesso!';
    });
});
