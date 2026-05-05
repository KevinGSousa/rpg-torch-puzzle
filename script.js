// Projeto base será montado aqui passo a passo durante a mentoria.
// Usaremos HTML/CSS/JS puro, mas vou manter no canvas para organizar os arquivos e lógica.

/*
ESTRUTURA FINAL:
- index.html
- style.css
- script.js
*/

// Iniciando com as Tochas
let torches = [true, true, true, true, true, true, true]; // Todas as tochas estão acesas inicialmente

const gameContainer = document.getElementById("game-container");

// Função para renderizar as tochas na tela
// Ela será basicamente nossa impressora visual do jogo.
function renderTorches() {
  gameContainer.innerHTML = "";

  torches.forEach((torch, index) => {
    const torchElement = document.createElement("div");
    torchElement.classList.add("torch");
    torchElement.classList.add(torch ? "on" : "off"); // Adiciona a classe "on" ou "off" dependendo do estado da tocha

    const angle = (index / torches.length) * (Math.PI * 2);
    
    const x = 250 + 180 * Math.cos(angle); // Calcula a posição x usando trigonometria
    const y = 250 + 180 * Math.sin(angle); // Calcula a posição y usando trigonometria
    
    torchElement.style.left = `${x}px`;
    torchElement.style.top = `${y}px`;
    
    gameContainer.appendChild(torchElement);
  });

}
// Função para alternar o estado de uma tocha
function toggleTorch(index){


}

renderTorches(); // Renderiza as tochas inicialmente
