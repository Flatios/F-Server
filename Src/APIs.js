const axios = require('axios');


let collect_key = process.env.COLLECTAPI_KEY;
let collect_key2 = process.env.COLLECTAPI_KEY2;
let openweatherapi = process.env.OPENWEATHERAPI_KEY;
let Country = process.env.COUNTRY;




function API(req, res, app, api, city, town, local) {
    if (local === false) {
        if (city || town) {
            // Weather API
            if (api === 'weather') {
                let NewsAPIUrl = `http://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${openweatherapi}&units=metric&lang=tr`;
                axios.get(NewsAPIUrl, {}).then(response => {var icon_code = response.data.weather[0].icon;
                res.json({"success": true,"result": [{SICAKLIK: response.data.main.temp,ACIKLAMA: response.data.weather[0].description,ICON: `http://openweathermap.org/img/wn/${icon_code}.png`}]});});
            };

            // News API
            if (api === 'news') {let NewsAPIUrl = `https://api.collectapi.com/news/getNews?country=${Country}&tag=general`;
            axios.get(NewsAPIUrl, { headers: {'Content-Type': 'application/json', authorization: collect_key}})
            .then(response => {let result0 = response.data;res.json(result0)})
            };

    
            // Nöbetçi Eczane API
            if (api === 'pod') {
                let NewsAPIUrl = `http://api.collectapi.com/health/dutyPharmacy?ilce=${town}&il=${city}`;
                axios.get(NewsAPIUrl, { headers: {'Content-Type': 'application/json', authorization: collect_key2}})
                .then(response => {let result0 = response.data;res.json(result0)})
            };

        }
        else {res.json ({"success": false})}    

}
}







module.exports = API