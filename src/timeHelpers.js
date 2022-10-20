const { DateTime } = require("luxon")
const html2canvas = require("html2canvas")
import Timezones from './timezones.csv';


function generateImageDownload() {
  html2canvas(document.getElementById("main"), {
    allowTaint: true,
    useCORS: true,
  })
    .then(function (canvas) {
      // It will return a canvas element
      let image = canvas.toDataURL("image/png", 0.5);
      var bses64Image = "data:image/" + image;
      document.getElementById('download').setAttribute('href', bses64Image)
    })
    .catch((e) => {
      // Handle errors
      console.log(e);
    });
}


export function calculateTz(inputDate) {
  console.log(inputDate)
  const timesFlags = new Map()
  Timezones.forEach((item, idx) => {
    const [flag, tz] = item
    const movedDate = inputDate.setZone(tz).setZone('utc', {
      keepLocalTime: true
    }).toMillis()
    if (!timesFlags.has(movedDate)) {
      timesFlags.set(movedDate, new Array())
    }
    console.log(`${tz} ${movedDate}`)
    timesFlags.get(movedDate).push(flag)
  });

  const sortedDates = Array.from(timesFlags.keys()).sort().map(date => {
    return {
      flags: timesFlags.get(date),
      time: date
    }
  })
  return sortedDates
}