import "./style.css"
import html2canvas from 'html2canvas';
import React, { useEffect, useState } from 'react'
import { InputsForm } from "./InputsForm"
import { calculateTz } from "./timeHelpers"
import { TimesPanel } from "./TimesPanel"
import { DownloadButton } from "./DownloadButton"


export default function App() {

    const [image, setImage] = useState('')
    const [data, setData] = useState(new Array());
    const [thumbnail, setThumbnail] = useState("#");
    const updateSettings = (inputDate) => {
        const sortedTimes = calculateTz(inputDate);
        setData(sortedTimes)
    }
    const updateImage = (image) => {
        setImage(image);
    }

    useEffect(() => {
        html2canvas(document.getElementById("main"), {
            allowTaint: true,
            useCORS: true,
        })
            .then(function (canvas) {
                // It will return a canvas element
                let tt = canvas.toDataURL("image/png", 0.5);
                console.log("Set image")
                setThumbnail(tt)
            })
            .catch((e) => {
                // Handle errors
                console.log(e);
            });
    }, [image, data])

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
                    <TimesPanel data={data} />
                </div>
            </div>
            <DownloadButton thumbnail={thumbnail} />
        </div>
    )
}