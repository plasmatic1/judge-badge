import { DEFAULT_COLOR } from "../constants"
import { badgen } from 'badgen'

abstract class Judge {
    requestCount: number
    requestTimeout: NodeJS.Timeout

    /**
     * Constructs a Judge object.  Each Judge object instance is responsible for handling requests for SVGs for a single judge
     */
    constructor() {
        this.requestCount = 0
        this.requestTimeout = null
    }

    /**
     * Returns an associative array of rating bounds to their respective colours.  The key should be the lower bound for
     * the rating range with the specified colour (i.e. if red is from 2400-2999, add "2400 => 'red'" into the map).
     *
     * The list should be in increasing order of bounds, and there should be at least one bound that's 0
     */
    protected abstract get ratingMap(): [number, string][]

    /**
     * Name of the judge
     */
    abstract get judgeName(): string

    /**
     * Url to the icon of the judge
     */
    protected abstract get judgeIconUrl(): string

    /**
     * Max # of requests per period.  Used for rate limiting.  If it's -1, then no limit is applied.
     * (i.e. If the limit was 10 requests per minute, the max requests would be 10)
     */
    protected abstract get maxRequestsPerPeriod(): number

    /**
     * Length of a period, in ms (i.e. if the limit was 10 requests per minute, the period would be 60000)
     */
    protected abstract get requestPeriod(): number

    /**
     * Sends the request to get the rating for a handle.
     *
     * @param handle: string Handle of the user
     * @protected
     */
    protected abstract getRatingHelper(handle: string): Promise<number>

    /**
     * Retrieves the rating for a handle.  The rate limit will apply in this scenario.
     * @param handle Handle of the user
     * @return If the rate limit was exceeded, `null` will be returned instead
     */
    async getRating(handle: string): Promise<number> {
        // Exceeded rate limit
        if (this.maxRequestsPerPeriod !== -1 && this.requestCount >= this.maxRequestsPerPeriod)
            return Promise.reject('Rate Limit Exceeded')

        // Create timer
        if (this.maxRequestsPerPeriod !== -1 && this.requestTimeout === null) {
            this.requestTimeout = setTimeout(() => {
                this.requestCount = 0
                this.requestTimeout = null
            }, this.requestPeriod)
        }

        this.requestCount++
        return await this.getRatingHelper(handle)
    }

    /**
     * Generates an SVG badge for the given rating
     * @param rating The rating of the user.  A string can also be passed in to indicate an error
     * @return An HTML string
     */
    generateBadge(rating: number | string): string {
        let color: string = DEFAULT_COLOR
        if (typeof (rating) === 'number') {
            for (const [ratingBound, boundColor] of this.ratingMap) {
                if (rating >= ratingBound)
                    color = boundColor
            }
        }

        return badgen({
            label: this.judgeName,
            status: typeof (rating) === 'number' ? rating.toString() : rating,
            color: color,
            icon: this.judgeIconUrl
        })
    }

    /**
     * Generates an SVG badge for the given handle.  The handle is used to retrieve rating
     * @param handle The handle of the user
     * @return An HTML string
     */
    async generateBadgeWithHandle(handle: string): Promise<string> {
        try {
            return this.generateBadge(await this.getRating(handle))
        } catch (e) {
            return this.generateBadge(e.toString())
        }
    }

    /**
     * Returns a sample of the badges, as an HTML list
     *
     * @return An HTML string
     */
    generateBadgeSample(): string {
        return `<div>
                    ${this.ratingMap.map(([bound, _]) => this.generateBadge(bound)).join('&nbsp;')}
                    ${this.generateBadge('Error')}
                </div>`
    }
}

export default Judge;