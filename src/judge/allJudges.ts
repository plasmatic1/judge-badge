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
                <h1>Judge-Badge</h1>
                
                <p>
                    A system for rendering dynamic SVG pill badges for online judge profiles.  Information on usage and source code can be found on
                        <a href="https://github.com/plasmatic1/judge-badge">GitHub</a>.
                </p>
                
                <h1>Badge Samples</h1>

                <p>Below is a sample badge with some static text:</p>
                ${badgen({
                    subject: 'ludicrously long',
                    status: 'placeholder badge'
                })}

                <p>Below are sample badges for each supported judge. Every supported rating level is shown:</p>
                ${JUDGES.map(({judge}) =>
                    `<h2>${judge.judgeName}</h2>${judge.generateBadgeSample()}`       
                ).join('')}
            </body>
            </html>`
}

export { JUDGES, JudgeDesc, generateBadgeSample }
