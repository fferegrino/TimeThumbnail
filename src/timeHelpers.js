const {DateTime} =require("luxon")
const html2canvas = require("html2canvas")


export const timezones = [
  "🇲🇽:America/Mexico_City",
  "🇨🇴:America/Bogota",
  "🇨🇱:America/Santiago",
  "🇪🇨:America/Guayaquil",
  "🇻🇪:America/Caracas",
  "🇧🇴:America/La_Paz",
  "🇪🇸:Europe/Madrid",
  "🇵🇪:America/Lima",
  "🇵🇾:America/Asuncion",
  "🇦🇷:America/Argentina/Buenos_Aires",
  "🇬🇶:Africa/Malabo",
  "🇨🇷:America/Costa_Rica",
  "🇬🇧:Europe/London",
]

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


export function calculateTz(date, time, timezone, hours, dates) {
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
      }, {
          zone: timezone
      })
  }

  const timesFlags = new Map()
  timezones.forEach(entry => {
      const [flag, tz] = entry.split(':')
      const movedDate = inputDate.setZone(tz).setZone('utc', {
          keepLocalTime: true
      }).toMillis()
      if (!timesFlags.has(movedDate)) {
          timesFlags.set(movedDate, new Array())
      }
      timesFlags.get(movedDate).push(flag)
  });
  dates.textContent = inputDate.setLocale('es-MX').toLocaleString(DateTime.DATE_HUGE)
  const sortedDates = Array.from(timesFlags.keys()).sort()
  hours.innerHTML = ''

  sortedDates.forEach(milliseconds => {
      const tim = DateTime.fromMillis(milliseconds)
      const shortTime = tim.setLocale('en-US').toLocaleString(DateTime.TIME_SIMPLE)
      const flags = timesFlags.get(milliseconds)
      const newText = document.createElement('span')
      newText.className = 'time'
      newText.innerHTML = `${shortTime}&nbsp;${flags.join('')}`.replace(' ', '&nbsp;')
      hours.appendChild(newText)
  });

  generateImageDownload()
}