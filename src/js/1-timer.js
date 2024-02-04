import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const inputClock = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[data-seconds]');


function styleBtnInputOff(s) {
  switch (s) {
    case btnStart:
      btnStart.style.backgroundColor = '#cfcfcf';
      btnStart.style.color = '#989898';
      btnStart.style.cursor = 'auto';
      break;

    case inputClock:
      inputClock.style.backgroundColor = '#FAFAFA';
      inputClock.style.color = '#808080';
      inputClock.style.cursor = 'auto';
      inputClock.style.borderColor = '#808080';
      break;
  }
}

function styleBtnInputOn(s) {
  switch (s) {
    case btnStart:
      btnStart.style.backgroundColor = null;
      btnStart.style.color = null;
      btnStart.style.cursor = 'pointer';
      break;

    case inputClock:
      inputClock.style.backgroundColor = null;
      inputClock.style.color = null;
      inputClock.style.cursor = 'pointer';
      inputClock.style.borderColor = null;
      break;
  }
}

flatpickr(inputClock, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    validateSelectedDate(selectedDates[0]);
  },
});

btnStart.disabled = true;
styleBtnInputOff(btnStart);

function validateSelectedDate(selectedDate) {
  if (selectedDate <= Date.now()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      backgroundColor: '#EF4040',
      titleColor: '#fff',
      titleSize: '16px',
      titleLineHeight: '1.5',
      messageColor: '#fff',
      messageSize: '16px',
      messageLineHeight: '1.5',
      position: 'topRight',
      timeout: 3000,
      progressBar: false,
    });

    btnStart.disabled = true;
    styleBtnInputOff(btnStart);
  } else {
    btnStart.disabled = false;
    styleBtnInputOn(btnStart);
  }
}

btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  btnStart.disabled = true;
  styleBtnInputOff(btnStart);

  inputClock.disabled = true;
  styleBtnInputOff(inputClock);

  const clockValue = inputClock.value;

  const timerInt = setInterval(() => {
    const initDate = new Date(clockValue);
    const diffTime = initDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(diffTime);

  day.textContent = addLeadingZero(days);
  hour.textContent = addLeadingZero(hours);
  min.textContent = addLeadingZero(minutes);
  sec.textContent = addLeadingZero(seconds);

  if (diffTime < 1000) {
    clearInterval(timerInt);

    inputClock.disabled = false;
    styleBtnInputOn(inputClock);

  }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
//--

