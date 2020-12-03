'use strict'
const { google } = require('googleapis');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
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

// create a GET route to fetch data from Sheets!
app.get("/v4-get", function (req, res) {
    console.log(req.query.spreadSheetName)
    let spreadSheetName = req.query.spreadSheetName;
    let column = req.query.column;
    let row = req.query.row;
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

            datapull(jwtClient, spreadSheetName, column, row);
        }
    });

    function datapull(jwtClient, spreadSheetName, column, row) {
        //Google Sheets API
        let spreadsheetId = process.env.REACT_APP_GSHEET_SPREADSHEET_ID;
        console.log(spreadsheetId)
        let sheetName = spreadSheetName + '!' + column + ":" + row;
        let sheets = google.sheets('v4');
        sheets.spreadsheets.values.get({
            auth: jwtClient,
            spreadsheetId: spreadsheetId,
            range: sheetName
        }, function (err, response) {
            if (err) return console.log('The API returned an error: ' + err);
            const rows = response.data.values;
            // if (rows.length) {
            //     console.log('Name, Major:');
            //     // Print columns A and E, which correspond to indices 0 and 4.
            //     rows.map((row) => {
            //         console.log(`${row[0]}, ${row[4]}`);
            //     });
            // } else {
            //     console.log('No data found.');
            // }

            // (3) Setting data for daily tracking

            // (4) Rendering the page and passing the rows data in
            res.json({ rows: rows })
        });
    }
});

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

        
        // const valueRangeBody = {
        //     'majorDimension': 'ROWS', //log each entry as a new row (vs column)
        //     'values': submissionValues //convert the object's values to an array
        // };

        // const params = {
        //     // The ID of the spreadsheet to update.
        //     // spreadsheetId: spreadsheetId,
        //     // // The A1 notation of a range to search for a logical table of data.Values will be appended after the last row of the table.
        //     // range: spreadSheetName + '!' + column + ':' + row, //this is the default spreadsheet name, so unless you've changed it, or are submitting to multiple sheets, you can leave this
        //     // How the input data should be interpreted.
        //     // valueInputOption: 'RAW', //RAW = if no conversion or formatting of submitted data is needed. Otherwise USER_ENTERED
        //     // How the input data should be inserted.
        //     insertDataOption: 'INSERT_ROWS', //Choose OVERWRITE OR INSERT_ROWS
        // };


        let sheets = google.sheets('v4');
        sheets.spreadsheets.values.append(request, function (err, response) {
                if (err) return console.log('The API returned an error: ' + err);
                // const rows = response.data.values;
                // if (rows.length) {
                //     console.log('Name, Major:');
                //     // Print columns A and E, which correspond to indices 0 and 4.
                //     rows.map((row) => {
                //         console.log(`${row[0]}, ${row[4]}`);
                //     });
                // } else {
                //     console.log('No data found.');
                // }

                // (3) Setting data for daily tracking

                // (4) Rendering the page and passing the rows data in
                res.json("OK")
            });
    }
});

