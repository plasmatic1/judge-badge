import Judge from './judge'
import DMOJ from './dmoj'
import Codeforces from "./codeforces"
import Atcoder from "./atcoder"
import Topcoder from "./topcoder"
import { badgen } from 'badgen'

type JudgeDesc = {
    judge: Judge
}

const JUDGES: JudgeDesc[] = [
    {
        judge: new DMOJ()
    },
    {
        judge: new Codeforces()
    },
    {
        judge: new Atcoder()
    },
    {
        judge: new Topcoder()
    }
]

function generateBadgeSample(): string {
    return `<!DOCTYPE html>
            <html lang="html">
            <body>
                <h1>Badge Samples</h1>
                ${badgen({
                    subject: 'ludicrously long',
                    status: 'placeholder badge'
                })}
                ${JUDGES.map(({judge}) =>
                    `<h2>${judge.judgeName}</h2>${judge.generateBadgeSample()}`       
                ).join('')}
            </body>
            </html>`
}

export { JUDGES, JudgeDesc, generateBadgeSample }
