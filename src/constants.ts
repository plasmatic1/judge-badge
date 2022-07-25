import path from 'path'

const HOST = '0.0.0.0'
const PORT = 8000

const DEFAULT_COLOR = 'black'

const ASSETS_DIR_PATH = path.join(__dirname, '..', 'assets')
const STATIC_URL_PATH = '/static'
const PROD = process.argv[2] === 'prod'
const BASE_URL = PROD ? 'https://www.mosesxu.ca/judge-badge/' : 'http://localhost:8000/'

export { HOST, PORT, DEFAULT_COLOR, STATIC_URL_PATH, BASE_URL, PROD, ASSETS_DIR_PATH }