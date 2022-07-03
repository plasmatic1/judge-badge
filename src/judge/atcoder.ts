import Judge from './judge'
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

class AtCoder extends Judge {
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

    protected get judgeIconUrl(): string {
        return 'https://img.atcoder.jp/assets/atcoder.png'
    }

    protected get judgeName(): string {
        return 'AtCoder'
    }

    protected get maxRequestsPerPeriod(): number {
        return 10
    }

    protected get ratingMap(): [number, string][] {
        return [
            [0, '572d00'],
            [800, 'green'],
            [1200, '04bab1'],
            [1600, 'blue'],
            [2000, 'yellow'],
            [2400, 'ff8c00'],
            [2800, 'red'],
        ];
    }

    protected get requestPeriod(): number {
        return 10000
    }
}

export default AtCoder