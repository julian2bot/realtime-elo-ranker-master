import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888/api';
const SIMULATION_INTERVAL_MS = 10; // Every 10 ms
const DRAW_PROBABILITY = 0.1; // 10% chance of a draw

interface PlayerRanking {
    id: string;
    rank: number;
}

async function simulateMatch() {
    try {
        // Fetch players
        const response = await axios.get<PlayerRanking[]>(`${API_BASE_URL}/ranking`);
        const players = response.data;

        if (players.length < 2) {
            console.log('pas assez de joueurs snif...');
            return;
        }

        // select 2 random players 
        const idxA = Math.floor(Math.random() * players.length);
        let idxB = Math.floor(Math.random() * players.length);
        while (idxB === idxA) {
            idxB = Math.floor(Math.random() * players.length);
        }


        const playerA = players[idxA];
        const playerB = players[idxB];

        // calcul la proba de gagné pour le joueur A avec :
        // Ea = 1 / (1 + 10^((Rb - Ra) / 400))
        const Ea = 1 / (1 + Math.pow(10, (playerB.rank - playerA.rank) / 400));

        const rand = Math.random();

        let winner: string;
        let loser: string;
        let draw = false;

        // faire egalité ou pas:
        if (rand < DRAW_PROBABILITY) {
            draw = true;
            winner = playerA.id;
            loser = playerB.id;
        } else {
            // Remapping rand to [0, 1] after excluding DRAW_PROBABILITY
            const adjustedRand = (rand - DRAW_PROBABILITY) / (1 - DRAW_PROBABILITY);
            if (adjustedRand < Ea) {
                winner = playerA.id;
                loser = playerB.id;
            } else {
                winner = playerB.id;
                loser = playerA.id;
            }
        }

        console.log(`[${new Date().toLocaleTimeString()}] Simulating match: ${playerA.id} (${Math.round(playerA.rank)}) vs ${playerB.id} (${Math.round(playerB.rank)})`);
        if (draw) {
            console.log(`Result: Égalité entre [${playerA.id}] et [${playerB.id}]`);
        } else {
            console.log(`Result: [${winner}] gagne contre [${loser}]`);
        }

        await axios.post(`${API_BASE_URL}/match`, {
            winner,
            loser,
            draw
        });

        console.log('Match successfully sent to server.');
    } catch (error: any) {
        if (error.response) {
            console.error(`Error simulating match: Server responded with ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        } else {
            console.error('Error simulating match:', error.message);
        }
    }
}

console.log('-------------------------------------------');
console.log('Starting Realtime Elo Ranker Simulator...');
console.log(`Targeting API: ${API_BASE_URL}`);
console.log(`Interval: ${SIMULATION_INTERVAL_MS}ms`);
console.log('-------------------------------------------');

// appel initial 
simulateMatch();

// simulation
setInterval(simulateMatch, SIMULATION_INTERVAL_MS);
