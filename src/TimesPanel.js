import React from 'react';
const { DateTime } = require("luxon")

export function TimesPanel({ data }) {

    let buffer = [];

    data.forEach((entry, idx) => {
        const flags = entry.flags.join('');
        const tim = DateTime.fromMillis(entry.time)
        const shortTime = tim.setLocale('en-US').toLocaleString(DateTime.TIME_SIMPLE)
        buffer.push(<span className="time" key={entry.time}>{shortTime} {flags}</span>);
    });

    return (
        <div id="hours">
            {buffer}
        </div>);
}
