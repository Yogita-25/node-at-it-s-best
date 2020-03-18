const request = require("request");

const url = "https://api.darksky.net/forecast/167d03b94dd222d1393aeadb05a4d3eb/37.8267,-122.4233";

request({url:url},(error,response)=>{
    const data = JSON.parse(response.body);
    console.log(data.currently);
})