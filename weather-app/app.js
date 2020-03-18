const request = require("request");

const url = "https://api.darksky.net/forecast/167d03b94dd222d1393aeadb05a4d3eb/37.8267,-122.4233?lang=de";     // de for german... output==Nieselregen möglich am Vormittag. It is currently 48.35 degrees out. There is a  1% chance of rain.

request({ url: url, json: true }, (error, response) => {    // json:true parse response data to object
    console.log(response.body.daily.data[0].summary,"It is currently",response.body.currently.temperature,"degrees out. There is a ",response.body.currently.precipProbability+"% chance of rain.");
    // console.log(response.body.currently);
})