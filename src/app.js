import "./style.css"
import React, { useState } from 'react'
import { InputsForm } from "./InputsForm"
import { calculateTz } from "./timeHelpers"
import Timezones from './timezones.csv';

export default function App() {

    const [image, setImage] = useState('')
    const updateSettings = (date, time, timezone) => {
        const sorted = calculateTz(date, time, timezone)
        console.log(sorted)
        console.log(Timezones)
    }
    const updateImage = (image) => (
        setImage(image)
    );

    return (
        <div>
            <InputsForm updateSettings={updateSettings} updateImage={updateImage} />
            <div id="main">
                <div id="header">
                    🔴 EN VIVO
                </div>
                <div id="cover">
                    <img id="thumbnail" src={image} />
                </div>
                <div id="footer">
                    <div id="dates">

                    </div>
                    <div id="hours">

                    </div>
                </div>
            </div>
            <a download="image-name.png" id="download">download img</a>
        </div>
    )
}