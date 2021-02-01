var fs = require('fs');

const getHotels = (request, response) => {
    var obj;
    fs.readFile('./auctions/hotels.json', 'utf8', function (err, data) {
        if (err) response.json(err)//throw err;
        obj = JSON.parse(data);
        // console.log(obj)

        let hotels = [];

        for (let [key, value] of Object.entries(obj)) {
            value["hotelId"] = parseInt(key)
            hotels.push(value);
        }

        response.json(hotels)
    })

    // ### Fetching DATA
    // let hotels_URL = process.env.REACT_APP_HOTELS_SOURCE

    // fetch(hotels_URL)
    //     .then(res => res.json())
    //     .then(json => {
    //         let hotels = [];

    //         for (let [key, value] of Object.entries(json)) {
    //             value["hotelId"] = parseInt(key)
    //             hotels.push(value);
    //         }

    //         response.json(hotels)
    //     });
}

const getHotelsTutorial = (request, response) => {
    // ### Reading DATA from file
    var obj;
    fs.readFile('./auctions/hotelstutorial.json', 'utf8', function (err, data) {
        if (err) response.json(err)//throw err;
        obj = JSON.parse(data);
        // console.log(obj)

        let hotels = [];

        for (let [key, value] of Object.entries(obj)) {
            value["hotelId"] = parseInt(key)
            hotels.push(value);
        }

        response.json(hotels)
    });

    // ### Fetching DATA
    // let hotels_URL = process.env.REACT_APP_HOTELS_TUTORIAL_SOURCE

    // fetch(hotels_URL)
    //     .then(res => res.json())
    //     .then(json => {
    //         let hotels = [];

    //         for (let [key, value] of Object.entries(json)) {
    //             value["hotelId"] = parseInt(key)
    //             hotels.push(value);
    //         }

    //         response.json(hotels)
    //     });
}

const getHotelsRev = (request, response) => {
    // ### Reading DATA from file
    var obj;
    fs.readFile('./auctions/hotels-rev.json', 'utf8', function (err, data) {
        if (err) response.json(err)//throw err;
        obj = JSON.parse(data);
        // console.log(obj)

        const jsonSize = Object.keys(obj).length
        let hotels = [];

        for (let [key, value] of Object.entries(obj)) {
            value["hotelId"] = jsonSize - (parseInt(key) - 1)
            hotels.push(value);
        }

        response.json(hotels)
    });

    // ### Fetching DATA
    // let hotels_URL = process.env.REACT_APP_HOTELS_REV_SOURCE

    // fetch(hotels_URL)
    //     .then(res => res.json())
    //     .then(json => {
    //         const jsonSize = Object.keys(json).length
    //         let hotels = [];

    //         for (let [key, value] of Object.entries(json)) {
    //             value["hotelId"] = jsonSize - (parseInt(key) - 1)
    //             hotels.push(value);
    //         }

    //         response.json(hotels)
    //     });
}

module.exports = {
    getHotels,
    getHotelsTutorial,
    getHotelsRev
}