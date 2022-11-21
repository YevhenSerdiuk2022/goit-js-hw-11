import throttle from 'lodash.throttle';


const LOCALSTORAGE_KEY = 'feedback-form-state';
const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('[name="message"]'),
    email: document.querySelector('[name="email"]')
}

let formData = {};

populateOnForm();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(evt) {
    evt.preventDefault();
    evt.target.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
 }

function onFormInput(evt) {
    formData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
 }

function populateOnForm() {
    let savedOnForm = localStorage.getItem(LOCALSTORAGE_KEY);
    if (savedOnForm) {
        savedOnForm = JSON.parse(savedOnForm);
        Object.entries(savedOnForm).forEach(([name, value]) => {
            refs.form.elements[name].value = value;
            console.log( refs.form.elements[name].value)
        });
    }
}


