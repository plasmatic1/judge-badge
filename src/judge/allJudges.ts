import Judge from './judge'
import DMOJ from './dmoj'
import { badgen } from 'badgen'

type JudgeDesc = {
    id: string
    label: string
    judge: Judge
}

const JUDGES: JudgeDesc[] = [
    {
        id: 'dmoj',
        label: 'DMOJ',
        judge: new DMOJ()
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
                ${JUDGES.map(({label, judge}) =>
                    `<h2>${label}</h2>${judge.generateBadgeSample()}`       
                ).join()}
            </body>
            </html>`
}

export { JUDGES, JudgeDesc, generateBadgeSample }