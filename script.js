// Iniciando com as Tochas
let torches = [true, true, true, true, true, true, true]; // Todas as tochas estão acesas inicialmente

const gameContainer = document.getElementById("game-container");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset-button");
const ambienceSound = new Audio("./assets/sounds/dark_ambient.wav");
const victorySound = new Audio("./assets/sounds/magic_sucess.mp3");
const onTorch = new Audio("./assets/sounds/fire_woosh.mp3");

let audioStarted = false;
let audioEnabled = true;
ambienceSound.loop = true;
ambienceSound.volume = 0.6;
onTorch.volume = 0.6;
const audioButton = document.getElementById("audio-button");

// Função para iniciar o áudio ambiente
function startAudio() {
  if (!audioStarted) {
    ambienceSound.play();

    audioStarted = true;
  }
}

// Função para renderizar as tochas na tela
// Ela será basicamente aimpressora visual do jogo.
function renderTorches() {
  gameContainer.innerHTML = "";

  torches.forEach((torch, index) => {
    const torchElement = document.createElement("div");
    const flame = document.createElement("div");
    const handle = document.createElement("div");
    const pedestal = document.createElement("div");

    flame.classList.add("flame");
    handle.classList.add("handle");
    pedestal.classList.add("pedestal");

    torchElement.appendChild(flame);
    torchElement.appendChild(handle);
    torchElement.appendChild(pedestal);

    torchElement.classList.add("torch");
    torchElement.classList.add(torch ? "on" : "off"); // Adiciona a classe "on" ou "off" dependendo do estado da tocha

    const angle = ((index / torches.length) * (Math.PI * 2)) - (Math.PI / 2);
    
    const x = 250 + 160 * Math.cos(angle); // Calcula a posição x usando trigonometria
    const y = 250 + 160 * Math.sin(angle); // Calcula a posição y usando trigonometria
    
    torchElement.style.left = `${x - 30}px`;
    torchElement.style.top = `${y - 45}px`;

    torchElement.addEventListener("click", () => {
      startAudio(); // Inicia o áudio ambiente na primeira interação
      toggleTorch(index); // Alterna o estado da tocha ao clicar
    });
    
    gameContainer.appendChild(torchElement);
    
  });

}
// Função para alternar o estado de uma tocha
function toggleTorch(index){
  const left = (index - 1 + torches.length) % torches.length; // Índice da tocha à esquerda
  const right = (index + 1) % torches.length; // Índice da tocha à direita

  onTorch.currentTime = 0;
  onTorch.play();
  
  torches[index] = !torches[index]; // Alterna o estado da tocha clicada
  torches[left] = !torches[left]; // Alterna o estado da tocha à esquerda
  torches[right] = !torches[right]; // Alterna o estado da tocha à direita
  // O sinal ! representa a negação lógica, ou seja, se a tocha estava acesa (true), ela se torna apagada (false) e vice-versa.
  
  renderTorches(); // Renderiza as tochas novamente para refletir as mudanças de estado
  checkVictory(); // Verifica se o jogador venceu após cada clique
}
// Função para verificar se o jogador venceu (todas as tochas apagadas)
function checkVictory() {
  const allOff = torches.every(torch => torch === false); // Verifica se todas as tochas estão apagadas
  if(allOff){
    victorySound.play();
    setTimeout(() => {
      message.textContent = "As chamas cessam. O caminho se abre.";
      gameContainer.classList.add("victory"); // Adiciona uma classe de vitória para efeitos visuais
    }, 1500);

  } else {
    message.textContent = "";
  }
}

function resetGame(){
  torches = [true, true, true, true, true, true, true]; // Reseta todas as tochas para acesas
  renderTorches(); // Renderiza as tochas novamente
  message.textContent = ""; // Limpa a mensagem de vitória
  gameContainer.classList.remove("victory"); // Remove a classe de vitória
}

audioButton.addEventListener("click", () => {

  audioEnabled = !audioEnabled;

  ambienceSound.muted = !audioEnabled;
  onTorch.muted = !audioEnabled;

  audioButton.textContent = audioEnabled
    ? "🔊"
    : "🔇";

});

// document.addEventListener("click", () => {
//   ambienceSound.play();
// }, { once: true });
renderTorches(); // Renderiza as tochas inicialmente
resetButton.addEventListener("click", resetGame);