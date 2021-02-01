const dotenv = require('dotenv');
const Pool = require('pg').Pool //Pool manages a dynamic list/pool of Client objects, with automatic re-connect functionality
const format = require('pg-format');

dotenv.config();

const pool = new Pool({
    user: process.env.REACT_APP_DB_USER,
    host: process.env.REACT_APP_DB_HOST,
    database: process.env.REACT_APP_DB_NAME,
    password: process.env.REACT_APP_DB_PASSWORD,
    port: process.env.REACT_APP_DB_PORT,
})

const getScreens = (request, response) => {
    pool.query('SELECT * FROM screens ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserExperimentCount = (request, response) => {
    pool.query('SELECT * FROM user_experiment_count', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getVersions = (request, response) => {
    pool.query('SELECT * FROM experiment_versions ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPSFormData = (request, response) => {
    const sex = request.params.sex
    console.log('getPSFormData')
    console.log(sex)
    pool.query('SELECT * FROM psform WHERE sex = $1 ORDER BY question_code ASC', [sex], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getNavScreens = (request, response) => {
    const version = request.params.version
    console.log('getNavScreens')
    console.log(version)
    pool.query('SELECT s.name FROM screens_x_version sv, screens s, experiment_versions v WHERE sv.screen_id = s.id AND sv.version_id = v.id AND sv.version_id = (SELECT id FROM experiment_versions WHERE name = $1 ORDER BY sv.version_id, screen_order ASC)', [version], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAppTextData = (request, response) => {
    const sex = request.params.sex
    console.log('getAppTextData')
    console.log(sex)
    pool.query('SELECT s.name, sv.sex, sv.font_size, sv.text FROM text_x_screens sv, screens s WHERE sv.screen_id = s.id AND sex = $1', [sex], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPSForm = (request, response) => {
    const data = request.body
    // console.log(request.body)
    // console.log(data)

    pool.query(format('INSERT INTO userpsform (user_id, question_id, answer, created_at) VALUES %L Returning *', data), (error, results) => {
        if (error) {
            throw error
        }
        console.log(`UserPSForm added ${results.rowCount} rows`)
        response.status(201).send(`UserPSForm added ${results.rowCount} rows`)
    })
}

const createAuctionBids = (request, response) => {
    const data = request.body
    // console.log(request.body)
    // console.log(data)

    const query = format('INSERT INTO userauctionbids (user_id, screen_name, hotel_id, hotel_name, price_start, bid, bid_start_timestamp, bid_stop_timestamp, created_at) VALUES %L Returning *', data)

    console.log(query)

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        console.log(`UserAuctionBids added  ${results.rowCount} rows`)
        console.log(`UserAuctionBids added  ${results.rows} rows`)
        response.status(201).send(`UserAuctionBids added ${results.rowCount} rows`)
    })
}

const createVisualPattern = (request, response) => {
    const data = request.body
    // console.log(request.body)
    // console.log(data)

    const query = format('INSERT INTO uservisualpattern (user_id, screen_name, level, matrix_dimention, matrix, matrix_result, correct_tiles, incorrect_tiles, missing_tiles, retry, time_spent_in_screen, created_at) VALUES %L Returning *', data)

    console.log(query)

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        console.log(`UserVisualPattern added  ${results.rowCount} rows`)
        console.log(`UserVisualPattern added  ${results.rows} rows`)
        response.status(201).send(`UserVisualPattern added ${results.rowCount} rows`)
    })
}

const createUserForm = (request, response) => {
    const data = request.body
    // console.log(request.body)
    // console.log(data)

    const query = format('INSERT INTO userform (user_id, ariadna_user_id, sex, age, profession, years_education, level_education, type_auction, version_task, experiment_completed, survey_finish_timestamp) VALUES %L Returning *', data);

    console.log(query)

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        console.log(`UserForm added  ${results.rowCount} rows`)
        console.log(`UserForm added  ${results.rows} rows`)
        response.status(201).send(`UserForm added ${results.rowCount} rows`)
    })
}

const createUserInfo = (request, response) => {
    const data = request.body
    // console.log(request.body)
    // console.log(data)

    const query = format('INSERT INTO userinfo (user_id, os_name, os_version, browser_name, browser_version, browser_major, browser_language, engine_name, engine_version, screen_width, screen_height, created_at) VALUES %L Returning *', data);

    console.log(query)

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        console.log(`UserInfo added  ${results.rowCount} rows`)
        console.log(`UserInfo added  ${results.rows} rows`)
        response.status(201).send(`UserInfo added ${results.rowCount} rows`)
    })
}

const createUserLogTime = (request, response) => {
    const data = request.body
    // console.log(request.body)
    // console.log(data)

    const query = format('INSERT INTO userlogtime (user_id, screen_name, timestamp, time_spent_in_screen, created_at) VALUES %L Returning *', data);

    console.log(query)

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        console.log(`UserLog added  ${results.rowCount} rows`)
        console.log(`UserLog added  ${results.rows} rows`)
        response.status(201).send(`UserLog added ${results.rowCount} rows`)
    })
}

const createUserGeneraldata = (request, response) => {
    const data = request.body
    // console.log(request.body)
    // console.log(data)

    const query = format('INSERT INTO usergeneraldata (column1, column2, column3, column4, column5, column6, column7,column8, column9, column10, column11, column12, column13, column14) VALUES %L Returning *', data);

    console.log(query)

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        console.log(`UserGeneraldata added  ${results.rowCount} rows`)
        console.log(`UserGeneraldata added  ${results.rows} rows`)
        response.status(201).send(`UserGeneraldata added ${results.rowCount} rows`)
    })
}

module.exports = {
    getScreens,
    getUserExperimentCount,
    getVersions,
    getPSFormData,
    getAppTextData,
    getNavScreens,
    createPSForm,
    createAuctionBids,
    createVisualPattern,
    createUserForm,
    createUserInfo,
    createUserLogTime,
    createUserGeneraldata
}