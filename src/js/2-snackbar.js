import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const stateInput = document.querySelector('input[name="state"]:checked');
  const delayInput = document.querySelector('input[type="number"]');
	
  const stateChoice = stateInput.value;
  const delayMilSecond = Number(delayInput.value);

  createPromise(stateChoice, delayMilSecond)
    .then(delay => showToast('success', `Fulfilled promise in ${delay}ms`, '#59A10D'))
    .catch(delay => showToast('error', `Rejected promise in ${delay}ms`, '#EF4040'));

  form.reset();
}

function createPromise(value, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function showToast(type, message, backgroundColor) {
  iziToast[type]({
    message,
    backgroundColor,
    messageColor: '#fff',
    timeout: 3000,
    progressBar: false,
    position: 'topRight',
  });
}