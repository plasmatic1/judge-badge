import * as os from 'os'

const HOST = '0.0.0.0'
const PORT = 8000

const DEFAULT_COLOR = 'black'

const STATIC_PATH = 'static/'
const HOSTNAME = os.hostname()

export { HOST, PORT, DEFAULT_COLOR, STATIC_PATH, HOSTNAME }