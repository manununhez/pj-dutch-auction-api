'use strict'
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const db = require('./queries')
const fromFile = require('./readFile')
const cors = require('cors')

dotenv.config();

const port = process.env.PORT || 5000;

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
app.get('/userexpcount', db.getUserExperimentCount)
app.get('/screens', db.getScreens)
app.get('/versions', db.getVersions)
app.get('/psform/:sex', db.getPSFormData)
app.get('/apptext/:sex', db.getAppTextData)
app.get('/navscreens/:version', db.getNavScreens)
/**
 * GET to retrieve list of hotels
 */
app.get("/hotels", fromFile.getHotels);
app.get("/hotels-tutorial", fromFile.getHotelsTutorial);
app.get("/hotels-rev", fromFile.getHotelsRev);

/**
 * SAVE DATA
 */
app.post("/savepsform", db.createPSForm);
app.post("/saveauctionbids", db.createAuctionBids);
app.post("/savevisualpattern", db.createVisualPattern);
app.post("/saveuserform", db.createUserForm);
app.post("/saveuserinfo", db.createUserInfo);
app.post("/saveuserlogtime", db.createUserLogTime);
app.post("/saveusergeneraldata", db.createUserGeneraldata);