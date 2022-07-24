const HOST = '0.0.0.0'
const PORT = 8000

const DEFAULT_COLOR = 'black'

const STATIC_PATH = '/static'
const PROD = process.argv[2] === 'prod'
const BASE_URL = PROD ? 'https://www.mosesxu.ca/judge-badge/' : 'http://localhost:8000/'

export { HOST, PORT, DEFAULT_COLOR, STATIC_PATH, BASE_URL, PROD }