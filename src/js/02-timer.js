import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';


const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysNumber = document.querySelector('[data-days]');
const hoursNumber = document.querySelector('[data-hours]');
const minutesNumber = document.querySelector('[data-minutes]');
const secondsNumber = document.querySelector('[data-seconds]');

let timer = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
    }
    

    startBtn.addEventListener('click', () => {
      timer = setInterval(() => {
        const deltaTime = selectedDates[0] - new Date();
    
        if (deltaTime  < 1000) {
          clearInterval(timer);
        }
    
        const result = convertMs(deltaTime);
        timerDisplay(result);
     }, 1000);
    });

  },

};

flatpickr('#datetime-picker', options);

function timerDisplay({ days, hours, minutes, seconds }) {
  daysNumber.textContent = `${days}`;
  hoursNumber.textContent = `${hours}`;
  minutesNumber.textContent = `${minutes}`;
  secondsNumber.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
