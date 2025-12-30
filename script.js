// script.js

const CSV_PATH = './sample.csv';
const CARDS_COUNT = 4;

let songs = [];

/**
 * Faz o fetch do CSV e transforma em array de objetos
 */
async function loadCSV() {
  const response = await fetch(CSV_PATH);
  const text = await response.text();

  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i];
    });
    return obj;
  });
}

/**
 * Retorna N itens aleatórios sem repetir
 */
function getRandomItems(array, n) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

/**
 * Atualiza os cards na tela
 */
function updateCards() {
  if (songs.length === 0) return;

  const cards = document.querySelectorAll('.music-card');
  const selectedSongs = getRandomItems(songs, CARDS_COUNT);

  cards.forEach((card, index) => {
    const song = selectedSongs[index];
    if (!song) return;

    card.querySelector('.category').textContent = song.Categoria;
    card.querySelector('.song-title').textContent = song.Nome;
    card.querySelector('.artist-name').textContent = song.Artista;
    card.querySelector('.lyrics-snippet').textContent = song.Trecho;
  });
}

/**
 * Inicialização
 */
document.addEventListener('DOMContentLoaded', async () => {
  songs = await loadCSV();
  updateCards();

  const button = document.querySelector('.action-button');
  button.addEventListener('click', updateCards);
});