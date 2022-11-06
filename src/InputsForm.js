import React, { useEffect, useState } from 'react';
const { DateTime } = require("luxon")
import Timezones from './timezones.csv';

export function InputsForm({ updateSettings, updateImage }) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [timezone, setTimezone] = useState('America/Mexico_City');
    const [image, setImage] = useState('');

    const loadImage = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            updateImage(event.target.result);
        };
        reader.readAsDataURL(file);
    };
    useEffect(() => {
        if (date && time && timezone) {
            const year = parseInt(date.slice(0, 4))
            const month = parseInt(date.slice(5, 7))
            const day = parseInt(date.slice(8, 10))
            const hour = parseInt(time.slice(0, 2))
            const minute = parseInt(time.slice(3, 5))
            const inputDate = DateTime.fromObject({
                year: year,
                month: month,
                day: day,
                hour: hour,
                minute: minute
            },
                {
                    zone: timezone
                }
            )
            updateSettings(inputDate);
        }
    }, [time, date, timezone]);
    const dateChange = event => {
        setDate(event.target.value);
    };
    const timeChange = event => {
        setTime(event.target.value);
    };
    const timezoneChange = event => {
        setTimezone(event.target.value);
    };

    const timezoneOptions = Timezones.map(function (value, idx) {
        return <option key={value} value={value[1]}>{value[0]} {value[1]}</option>
    });
    return (
        <form>
            <input type="date" id="date" value={date} onChange={dateChange} />
            <input type="time" id="time" value={time} onChange={timeChange} />
            <select id="timezone" name="timezone" value={timezone} onChange={timezoneChange}>
                {timezoneOptions}
            </select>
            <label class="custom-file-upload">
                <input type="file" id="file" accept="image/x-png,image/jpeg" value={image} onChange={loadImage} />
                Select thumbnail
            </label>
        </form>
    );
}
