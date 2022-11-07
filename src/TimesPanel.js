import React from 'react';

const {DateTime} = require("luxon")

export function TimesPanel({data}) {

    let buffer = [];

    data.forEach((entry, idx) => {
        const flags = entry.flags.join('');
        const tim = DateTime.fromMillis(entry.time)
        const shortTime = tim.setLocale('es').toLocaleString(DateTime.TIME_SIMPLE).replace(' ', "&nbsp;")
        buffer.push(<span className="time" key={entry.time}>{shortTime} {flags}</span>);
    });

    return (
        <div id="hours">
            {buffer}
        </div>);
}
