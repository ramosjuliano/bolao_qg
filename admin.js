document.getElementById('gameForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const teamA = document.getElementById('teamA').value;
    const teamB = document.getElementById('teamB').value;
    const matchTime = document.getElementById('matchTime').value;

    const gameData = {
        teamA,
        teamB,
        matchTime
    };

    const response = await fetch('http://localhost:3000/game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
    });

    const result = await response.json();
    const resultDiv = document.getElementById('result');
    const gameLink = `${window.location.origin}/bet.html`;
    resultDiv.innerHTML = `Jogo cadastrado com sucesso! Envie este link para os apostadores: <a href="${gameLink}" target="_blank">${gameLink}</a>`;

    displayCurrentGame();
    displayBettors();
});

document.getElementById('clearData').addEventListener('click', async function() {
    await fetch('http://localhost:3000/data', {
        method: 'DELETE',
    });

    document.getElementById('currentGame').innerText = '';
    document.getElementById('bettors').innerText = '';
    document.getElementById('result').innerText = 'Sessão excluída com sucesso.';
});

async function displayCurrentGame() {
    const response = await fetch('http://localhost:3000/game');
    const gameData = await response.json();
    const currentGameDiv = document.getElementById('currentGame');

    if (gameData) {
        currentGameDiv.innerText = `${gameData.teamA} vs ${gameData.teamB} - Divulgação: ${new Date(gameData.matchTime).toLocaleString()}`;
    } else {
        currentGameDiv.innerText = 'Nenhum jogo cadastrado.';
    }
}

async function displayBettors() {
    const response = await fetch('http://localhost:3000/bets');
    const bets = await response.json();
    const bettorsDiv = document.getElementById('bettors');

    if (bets.length > 0) {
        bettorsDiv.innerHTML = '<ul>' + bets.map(bet => `<li>${bet.bettorName}</li>`).join('') + '</ul>';
    } else {
        bettorsDiv.innerText = 'Nenhuma aposta registrada.';
    }
}

// Initial display
displayCurrentGame();
displayBettors();
