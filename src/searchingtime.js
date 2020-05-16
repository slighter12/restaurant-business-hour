import TimePicker from "timepicker.js";

const timeEvent = document.querySelector('.main-select#time');
const timepicker = new TimePicker('timezone', {
    lang: 'pt',
    theme: 'dark'
});
timepicker.on('change', event => {
    let value = (event.hour || '00') + ':' + (event.minute || '00');
    event.element.value = value;
});
timeEvent.addEventListener( 'click', () => {
    console.log(document.querySelector('input[name="date"]').value)
});

export function getDateAndTime() {
    let date = document.querySelector("input[name='date']").value;
    let time = document.querySelector("input[id=timezone]").value;
    return { date, time }
}
