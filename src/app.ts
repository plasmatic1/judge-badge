import express from 'express'
import {BASE_URL, HOST, PORT, PROD, STATIC_PATH} from './constants'
import {JUDGES, generateBadgeSample} from './judge/allJudges'
import path from 'path'
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

for (const {id, judge} of JUDGES) {
    app.get(`/${id}/:handle`, async (req, res) => {
        const handle = req.params.handle
        res.setHeader('Content-Type', 'image/svg+xml')
        res.send(await judge.generateBadgeWithHandle(handle))
    })
    console.log(`Registered page for judge ${judge.judgeName} (path=${urlJoin(BASE_URL, id, '<handle>')})`)
}

// static files
app.use(STATIC_PATH, express.static(path.join(__dirname, '..', 'static')))

// run server
app.listen(PORT, HOST, () => {
    console.log(`Started server at ${HOST}:${PORT}`)
    console.log()
})