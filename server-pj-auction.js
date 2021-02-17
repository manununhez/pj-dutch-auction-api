'use strict'
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('./queries')
const fromFile = require('./readFile')
const cors = require('cors')
var compression = require('compression')

dotenv.config();

const port = process.env.PORT || 5000;

app.use(compression())
app.use(cors()) //RESOLVE! Request header field Authorization is not allowed by Access-Control-Allow-Headers in preflight response
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


/**
 * GET DATA
 */
app.get('/versions', db.getVersions)
app.get('/psform/:sex', db.getPSFormData)
app.get('/apptext/:sex', db.getAppTextData)
app.get('/inituserdata/:version', db.getUserInitialData)
/**
 * GET to retrieve list of hotels
 */
app.get("/hotels", fromFile.getHotels);
app.get("/hotels-tutorial", fromFile.getHotelsTutorial);
app.get("/hotels-rev", fromFile.getHotelsRev);

/**
 * SAVE DATA
 */
app.post("/psform", db.createPSForm);
app.post("/auctionbids", db.createAuctionBids);
app.post("/visualpattern", db.createVisualPattern);
app.post("/userinfo", db.createUserInfo);
app.post("/userlogtime", db.createUserLogTime);
app.post("/usergeneraldata", db.createUserGeneraldata);
