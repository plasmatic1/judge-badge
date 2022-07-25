import Judge from './judge'
import fetch from 'node-fetch'

class DMOJ extends Judge {
    protected async getRatingHelper(handle: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            fetch(`https://dmoj.ca/api/v2/user/${handle}`)
                .then(obj => obj.json())
                .then(obj => {
                    const rating = obj?.data?.object?.rating
                    if (rating === undefined)
                        reject('Not Found')
                    else if (rating === null)
                        reject('Unrated')
                    else
                        resolve(rating)
                })
                .catch(err => reject(err))
        })
    }

    constructor() {
        super(
            [
                [0, 'gray'],
                [1000, 'green'],
                [1300, 'blue'],
                [1600, 'purple'],
                [1900, 'yellow'],
                [2400, 'red'],
                [3000, '800000']
            ],
            'DMOJ',
            'dmoj',
            60,
            60000
        )
    }
}

export default DMOJ