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

    constructor() {
        super(
            [
                [0, 'gray'],
                [900, 'green'],
                [1200, 'blue'],
                [1500, 'yellow'],
                [2200, 'red'],
                [3000, '800000']
            ],
            'Topcoder',
            'topcoder',
            30,
            10000
        )
    }
}

export default Topcoder