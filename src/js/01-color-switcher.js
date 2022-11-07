const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  startBtn.addEventListener('click', () => {
    interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    
    startBtn.disabled = true;
    stopBtn.disabled = false;
  })

  stopBtn.addEventListener ('click', () => {
    clearInterval(interval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
  })


