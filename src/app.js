import "./style.css"
import html2canvas from 'html2canvas';
import React, {useEffect, useState} from 'react'
import {InputsForm} from "./InputsForm"
import {calculateTz} from "./timeHelpers"
import {TimesPanel} from "./TimesPanel"
import {DownloadButton} from "./DownloadButton"


export default function App() {

    const thumbnailZoom = 30;
    const width = 1920;

    const [image, setImage] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=')
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
            width: width,
            height: width,
            scale: 1,
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

    const containerStyle = {
        display: "grid",
        gridTemplateColumns: `300px ${width * (thumbnailZoom / 100)}px`,
        gridTemplateRows: `${width * (thumbnailZoom / 100)}px 50px`,
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
    }

    const thumbnailDisplayStyle = {

        backgroundColor: "black",
        width: `${width}px`,
        height: `${width}px`,
        zoom: `${thumbnailZoom}%`,

    }

    const controlPanelStyle = {
        backgroundColor: "#ececec"
    }

    const footerPanelStyle = {
        backgroundColor: "#142d4c",
        color: "#ececec",
        gridColumn: "1 / 3",
        textAlign: "center",
        fontFamily: "'Roboto', sans-serif",
    }

    return (
        <div style={containerStyle}>
            <div style={controlPanelStyle}>
                <InputsForm updateSettings={updateSettings} updateImage={updateImage}/>
                <DownloadButton thumbnail={thumbnail}/>
            </div>
            <div id="results">
                <div id="main" style={thumbnailDisplayStyle}>
                    <div id="header">
                        🔴 EN VIVO
                    </div>
                    <div id="cover">
                        <img id="thumbnail" src={image}/>
                    </div>
                    <div id="footer">
                        <div id="dates"></div>
                        <TimesPanel data={data}/>
                    </div>
                </div>

            </div>
            <div style={footerPanelStyle}>
                Please help me make this better <a style={{
                justifySelf: "center",
                color: "#ececec"
            }} href={"https://github.com/fferegrino/timethumbnail"}> GitHub </a>
            </div>
        </div>
    )
}