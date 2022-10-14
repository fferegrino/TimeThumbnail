const {DateTime} =require("luxon")
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
      var bses64Image= "data:image/" + image; 
      document.getElementById('download').setAttribute('href', bses64Image)
    })
    .catch((e) => {
      // Handle errors
      console.log(e);
    });
}


export function calculateTz(date, time, timezone) {
  let inputDate = DateTime.now();
  if (time && date && timezone) {

      const year = parseInt(date.slice(0, 4))
      const month = parseInt(date.slice(5, 7))
      const day = parseInt(date.slice(8, 10))
      const hour = parseInt(time.slice(0, 2))
      const minute = parseInt(time.slice(3, 5))


      inputDate = DateTime.fromObject({
          year: year,
          month: month,
          day: day,
          hour: hour,
          minute: minute
      }, 
      // {
      //     zone: timezone
      // }
      )
  }
  console.log(inputDate)
  const timesFlags = new Map()
  Timezones.forEach((flag, tz) => {
      const movedDate = inputDate.setZone(tz).setZone('utc', {
          keepLocalTime: true
      }).toMillis()
      if (!timesFlags.has(movedDate)) {
          timesFlags.set(movedDate, new Array())
      }
      timesFlags.get(movedDate).push(flag)
  });
  // dates.textContent = inputDate.setLocale('es-MX').toLocaleString(DateTime.DATE_HUGE)
  const sortedDates = Array.from(timesFlags.keys()).sort().map(date => {
    return {
      flags: timesFlags.get(date),
      time: date
    }
  })
  return sortedDates
}