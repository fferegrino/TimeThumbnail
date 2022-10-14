import React, { useEffect, useState } from 'react';
import Timezones from './timezones.csv';

export function InputsForm({ updateSettings, updateImage }) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [timezone, setTimezone] = useState('');
    const [image, setImage] = useState('');

    const loadImage = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            // The file's text will be printed here
            updateImage(event.target.result);
        };

        reader.readAsDataURL(file);

    };
    useEffect(() => {
        if (date && time && timezone) {
            updateSettings(date, time, timezone);
        }
        else {
            console.log(`${date}, ${time}, ${timezone}`);
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


    return (
        <form>
            <input type="date" id="date" value={date} onChange={dateChange} />
            <input type="time" id="time" value={time} onChange={timeChange} />
            <select id="timezone" name="timezone" value={timezone} onChange={timezoneChange}>
                {Timezones.map(function (value, idx) {
                    return <option key={value} value={value[1]}>{value[0]} {value[1]}</option>
                })}
            </select>
            <input type="file" id="file" value={image} onChange={loadImage} />
        </form>
    );
}
