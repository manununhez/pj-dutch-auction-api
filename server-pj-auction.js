'use strict'
const { google } = require('googleapis');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const db = require('./queries')

dotenv.config();

const port = process.env.PORT || 5000;

const cors = require('cors')

app.use(cors()) //RESOLVE! Request header field Authorization is not allowed by Access-Control-Allow-Headers in preflight response
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


app.get('/userexpcount', db.getUserExperimentCount)
app.get('/screens', db.getScreens)
app.get('/versions', db.getVersions)
app.get('/psform/:sex', db.getPSFormData)
app.get('/apptext/:sex', db.getAppTextData)
app.get('/navscreens/:version', db.getNavScreens)
/**
 * GET to retrieve list of hotels
 */
app.get("/hotels", function (req, response) {
    let hotels_URL = process.env.REACT_APP_HOTELS_SOURCE

    fetch(hotels_URL)
        .then(res => res.json())
        .then(json => {
            let hotels = [];

            for (let [key, value] of Object.entries(json)) {
                value["hotelId"] = parseInt(key)
                hotels.push(value);
            }

            response.json(hotels)
        });
});


/**
 * GET to retrieve list of hotels for tutorial
 */
app.get("/hotels-tutorial", function (req, response) {
    let hotels_URL = process.env.REACT_APP_HOTELS_TUTORIAL_SOURCE

    fetch(hotels_URL)
        .then(res => res.json())
        .then(json => {
            let hotels = [];

            for (let [key, value] of Object.entries(json)) {
                value["hotelId"] = parseInt(key)
                hotels.push(value);
            }

            response.json(hotels)
        });

});

/**
 * GET to retrieve list of hotels in reverseMode
 */
app.get("/hotels-rev", function (req, response) {
    let hotels_URL = process.env.REACT_APP_HOTELS_REV_SOURCE

    fetch(hotels_URL)
        .then(res => res.json())
        .then(json => {
            const jsonSize = Object.keys(json).length
            let hotels = [];

            for (let [key, value] of Object.entries(json)) {
                value["hotelId"] = jsonSize - (parseInt(key) - 1)
                hotels.push(value);
            }

            response.json(hotels)
        });
});


/**
 * POST to save data to GSheet
 */
app.post("/v4-post", function (req, res) {
    console.log(req.body)
    let spreadSheetName = req.body.spreadSheetName;
    let column = req.body.column;
    let row = req.body.row;
    let submissionValues = req.body.submissionValues;
    // Authorization
    // configure a JWT auth client
    let jwtClient = new google.auth.JWT(process.env.REACT_APP_CLIENT_EMAIL, null,
        process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/gm, '\n'),
        [process.env.REACT_APP_GSHEET_SCOPE]);
    //authenticate request
    jwtClient.authorize(function (err, tokens) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Successfully connected!");

            dataAppend(jwtClient, spreadSheetName, column, row, submissionValues);
        }
    });


    function dataAppend(jwtClient, spreadSheetName, column, row, submissionValues) {
        var request = {
            // The ID of the spreadsheet to update.
            spreadsheetId: process.env.REACT_APP_GSHEET_SPREADSHEET_ID,  // TODO: Update placeholder

            // The A1 notation of a range to search for a logical table of data.
            // Values will be appended after the last row of the table.
            range: spreadSheetName + '!' + column + ':' + row,  // TODO: Update placeholder value.

            // How the input data should be interpreted.
            valueInputOption: 'USER_ENTERED',//'RAW',  // TODO: Update placeholder value.

            // How the input data should be inserted.
            insertDataOption: 'INSERT_ROWS',  // TODO: Update placeholder value.

            resource: {
                'majorDimension': 'ROWS', //log each entry as a new row (vs column)
                'values': submissionValues //convert the object's values to an array
            },

            auth: jwtClient
        };


        let sheets = google.sheets('v4');
        sheets.spreadsheets.values.append(request, function (err, response) {
            if (err) return console.log('The API returned an error: ' + err);

            res.json("OK")
        });
    }
});

