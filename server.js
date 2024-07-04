const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/betting', { useNewUrlParser: true, useUnifiedTopology: true });

const gameSchema = new mongoose.Schema({
    teamA: String,
    teamB: String,
    matchTime: String,
});

const betSchema = new mongoose.Schema({
    bettorName: String,
    goalsA: Number,
    goalsB: Number,
    betTime: String,
});

const Game = mongoose.model('Game', gameSchema);
const Bet = mongoose.model('Bet', betSchema);

app.post('/game', async (req, res) => {
    const game = new Game(req.body);
    await game.save();
    res.send(game);
});

app.get('/game', async (req, res) => {
    const game = await Game.findOne();
    res.send(game);
});

app.post('/bet', async (req, res) => {
    const bet = new Bet(req.body);
    await bet.save();
    res.send(bet);
});

app.get('/bets', async (req, res) => {
    const bets = await Bet.find();
    res.send(bets);
});

app.delete('/data', async (req, res) => {
    await Game.deleteMany();
    await Bet.deleteMany();
    res.send({ message: 'All data cleared' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
