import express from 'express'
import {ASSETS_DIR_PATH, BASE_URL, HOST, PORT, PROD, STATIC_URL_PATH} from './constants'
import {JUDGES, generateBadgeSample} from './judge/allJudges'
import urlJoin from 'proper-url-join'

const app = express()

// logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date(Date.now()).toISOString()}] GET ${req.url}`)
    next()
});

// endpoints
app.get('/', (req, res) => {
    res.send(generateBadgeSample())
})
console.log(`PROD=${PROD}`)
console.log('Registered sample page')

for (const {judge} of JUDGES) {
    app.get(`/${judge.judgeId}/:handle`, async (req, res) => {
        const handle = req.params.handle
        res.setHeader('Content-Type', 'image/svg+xml')
        res.send(await judge.generateBadgeWithHandle(handle))
    })
    console.log(`Registered page for judge ${judge.judgeName} (example: ${urlJoin(BASE_URL, judge.judgeId, 'plasmatic')})`)
}

// static hosting of asset files (for fun!!!)
app.use(STATIC_URL_PATH, express.static(ASSETS_DIR_PATH))

// run server
app.listen(PORT, HOST, () => {
    console.log(`Started server at ${HOST}:${PORT}`)
    console.log()
})