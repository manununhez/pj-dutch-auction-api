const dotenv = require('dotenv');
const Pool = require('pg').Pool

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

module.exports = {
    getScreens,
    getUserExperimentCount,
    getVersions,
    getPSFormData,
    getAppTextData,
    getNavScreens
}