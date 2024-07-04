document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch('http://localhost:3000/game');
    const gameData = await response.json();
    const matchTime = new Date(gameData.matchTime);
    const now = new Date();

    if (now >= matchTime) {
        const betsResponse = await fetch('http://localhost:3000/bets');
        const bets = await betsResponse.json();
        const resultsDiv = document.getElementById('results');

        if (bets.length > 0) {
            resultsDiv.innerHTML = '<ul>' + bets.map(bet => `<li>${bet.bettorName} - ${gameData.teamA} ${bet.goalsA} x ${bet.goalsB} ${gameData.teamB} (Registrado em: ${bet.betTime})</li>`).join('') + '</ul>';
        } else {
            resultsDiv.innerText = 'Nenhuma aposta registrada.';
        }
    } else {
        document.body.innerHTML = '<h1>Resultados ainda não disponíveis. Volte após ' + matchTime.toLocaleString() + '.</h1>';
    }
});
