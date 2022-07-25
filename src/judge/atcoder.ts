import Judge from './judge'
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

class Atcoder extends Judge {
    protected async getRatingHelper(handle: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            fetch(`https://atcoder.jp/users/${handle}`)
                .then(obj => obj.text())
                .then(htmlData => {
                    // Couldn't find an API for this
                    // Gonna webscrape :(
                    const $ = cheerio.load(htmlData)
                    let rating = NaN
                    $('span[class^=user-]').each((_, tag) => {
                        const value = parseInt($(tag).text())
                        if (!isNaN(value) && (isNaN(rating) || value < rating))
                            rating = value
                    })

                    if (!isNaN(rating))
                        resolve(rating)
                    else
                        reject('Unrated')
                })
                .catch(err => reject(err))
        })
    }

    constructor() {
        super(
            [
                [0, '572d00'],
                [800, 'green'],
                [1200, '04bab1'],
                [1600, 'blue'],
                [2000, 'yellow'],
                [2400, 'ff8c00'],
                [2800, 'red'],
            ],
            'Atcoder',
            'atcoder',
            10,
            10000
        )
    }
}

export default Atcoder