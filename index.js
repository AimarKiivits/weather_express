const express = require('express');
const app = express();
const fetch = require('node-fetch');

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const key = '902a0d29f5d2b33923baa4fc16afb178';
let city = 'Tartu';


app.get('/', (req, res) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((responce) => {
            return responce.json();
        })
        .then((data) => {
            let description = data.weather[0].description;
            let temp = Math.round(parseFloat(data.main.temp - 273.15));
            let city = data.name;
            res.render('index', {
                city: city,
                temp: temp,
                description: description 
            });
        })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})