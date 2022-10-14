import './style.css';
import {calculateTz, timezones} from './timeHelpers.js'

const date = document.getElementById('date')
const time = document.getElementById('time')
const hours = document.getElementById('hours')
const dates = document.getElementById('dates')
const timezone = document.getElementById('timezone')
const footer = document.getElementById('footer')

const {Settings} =require("luxon")

Settings.defaultZone = "utc";

date.addEventListener('change', function() {
    calculateTz(date.value, time.value, timezone.value, hours, dates)
});
time.addEventListener('change', function() {
    calculateTz(date.value, time.value, timezone.value, hours, dates)
});
timezone.addEventListener('change', function() {
    calculateTz(date.value, time.value, timezone.value, hours, dates)
});


timezones.forEach(entry => {
    const [flag, tz] = entry.split(':')
    const newOption = document.createElement('option');
    newOption.text = `${flag} ${tz}`;
    newOption.value = tz;
    timezone.options.add(newOption)
})


calculateTz(date.value, time.value, timezone.value, hours, dates)

var file = document.getElementById('file'); // File refrence
file.addEventListener('change', function() {

    var thumbnail = document.getElementById('thumbnail'); // Image reference
    var reader = new FileReader(); // Creating reader instance from FileReader() API
    reader.addEventListener("load", function() { // Setting up base64 URL on image
        thumbnail.src = reader.result;
    }, false);
    reader.readAsDataURL(file.files[0]); // Converting file into data URL
    calculateTz(date.value, time.value, timezone.value, hours, dates)
});