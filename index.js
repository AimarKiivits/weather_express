const express = require('express');
const app = express();
const fetch = require('node-fetch');

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const key = '902a0d29f5d2b33923baa4fc16afb178';

const getWeatherDataPromise = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((responce) => {
                return responce.json();
            })
            .then((data) => {
                let description = data.weather[0].description;
                let temp = Math.round(parseFloat(data.main.temp - 273.15));
                let city = data.name;
                let result = {
                    city: city,
                    temp: temp,
                    description: description 
                };
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

app.all('/', async (req, res) => {
    let city
    if (req.method == 'GET') {
        city = 'Tartu';
    }
    if (req.method == 'POST') {
        city = req.body.cityname;
    }
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    getWeatherDataPromise(url)
        .then((result) => {
            console.log(result)
            res.render('index', { result: result });
        })
        .catch((error) => {
            console.log(error);
        })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})