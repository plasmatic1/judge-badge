import Judge from './judge'
import fetch from 'node-fetch'

class Codeforces extends Judge {
    protected async getRatingHelper(handle: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            fetch(`https://codeforces.com/api/user.rating?handle=${handle}`)
                .then(obj => obj.json())
                .then(obj => {
                    if (obj.status === 'OK') {
                        const result = obj.result
                        if (result.length === 0)
                            reject('Unrated')
                        else
                            resolve(result[result.length - 1].newRating)
                    }
                    else {
                        const err = obj.comment
                        if (err.match(/handle: User .* not found/g))
                            reject('Not Found')
                        else
                            reject('Error')
                    }
                })
                .catch(err => reject(err))
        })
    }

    constructor() {
        super(
            [
                [0, 'gray'],
                [1200, 'green'],
                [1400, '04bab1'],
                [1600, 'blue'],
                [1900, 'purple'],
                [2100, 'yellow'],
                [2300, 'ff8c00'],
                [2400, 'red'],
                [2600, 'ca0000'],
                [3000, '800000'],
                [4000, '400000']
            ],
            'Codeforces',
            'codeforces',
            30,
            10000
        )
    }
}

export default Codeforces