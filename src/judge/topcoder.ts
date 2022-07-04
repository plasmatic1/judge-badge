import Judge from './judge'
import fetch from 'node-fetch'

class Topcoder extends Judge {
    protected async getRatingHelper(handle: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            fetch(`https://api.topcoder.com/v2/users/${handle}`)
                .then(obj => obj.json())
                .then(obj => {
                    if (obj?.error)
                        reject(obj.error.name)
                    else {
                        for (const {name, rating} of obj.ratingSummary) {
                            if (name === 'Algorithm')
                                resolve(rating)
                        }
                        reject('Unrated')
                    }
                })
                .catch(err => reject(err))
        })
    }

    protected get judgeIconUrl(): string {
        return 'https://www.topcoder.com/wp-content/uploads/2020/05/cropped-TC-Icon-32x32.png'
    }

    get judgeName(): string {
        return 'Topcoder'
    }

    protected get maxRequestsPerPeriod(): number {
        return 30
    }

    protected get ratingMap(): [number, string][] {
        return [
            [0, 'gray'],
            [900, 'green'],
            [1200, 'blue'],
            [1500, 'yellow'],
            [2200, 'red'],
            [3000, '800000']
        ]
    }

    protected get requestPeriod(): number {
        return 10000
    }
}

export default Topcoder