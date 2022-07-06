import express from 'express'
import { HOST, PORT } from './constants'
import { JUDGES, generateBadgeSample } from "./judge/allJudges"
const app = express()

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date(Date.now()).toISOString()}] GET ${req.url}`)
    next()
});

// Endpoints
app.get('/', (req, res) => {
    res.send(generateBadgeSample())
})
console.log('Registered sample page')

for (const {id, judge} of JUDGES) {
    app.get(`/${id}/:handle`, async (req, res) => {
        const handle = req.params.handle
        res.setHeader('Content-Type', 'image/svg+xml')
        res.send(await judge.generateBadgeWithHandle(handle))
    })
    console.log(`Registered page for judge ${judge.judgeName} (path=/${id}/<rating>)`)
}

// Run server
app.listen(PORT, HOST, () => {
    console.log(`Started server at ${HOST}:${PORT}`)
    console.log()
})