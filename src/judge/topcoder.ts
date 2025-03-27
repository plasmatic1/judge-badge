import Judge from './judge'
import fetch from 'node-fetch'

class Topcoder extends Judge {
    protected async getRatingHelper(handle: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            /**
             * The Topcoder API documentation is extremely outdated, and does not provide any information on the current API version.
             * I had to go into the network tab of https://profiles.topcoder.com/HANDLE/ to find the correct endpoint.
             * 
             * API v2 (the latest documented one) appears to be deprecated; all requests result in a 403 Forbidden.
             *
             * So uhh... thanks I guess?
             */
            fetch(`https://api.topcoder.com/v5/members/${handle}/stats`)
                .then(obj => obj.json())
                .then(obj => {
                    if (obj?.error)
                        reject(obj.error.name)
                    else {
                        const rating = obj[0]?.DATA_SCIENCE?.SRM?.rank.rating
                        if (rating === null || rating === undefined)
                            reject('Not Found')
                        else if (rating === 0)
                            reject('Unrated')
                        else
                            resolve(rating)
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
