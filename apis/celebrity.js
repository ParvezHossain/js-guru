const request = require('request')
const dotenv = require('dotenv')
const process = require('process')

// Load environment variables from .env file
dotenv.config()

// Read the API key from the environment variable
const apiKey = process.env.API_KEY_API_NINJAS

// Check if the API key is available
if (!apiKey) {
    console.error('API key is missing. Please add it to the .env file.')
    process.exit(1)
}

// Get the name from the terminal input or use the default value
const args = process.argv.slice(2)
const name = args.length > 0 ? args.join(' ') : 'Michael Jordan'

// Make the API request
request.get(
    {
        url: `https://api.api-ninjas.com/v1/celebrity?name=${encodeURIComponent(
            name
        )}`,
        headers: {
            'X-Api-Key': apiKey,
        },
    },
    function (error, response, body) {
        if (error) {
            return console.error('Request failed:', error)
        } else if (response.statusCode !== 200) {
            return console.error(
                'Error:',
                response.statusCode,
            	body.toString('utf8')
            )
        }

        try {
            const data = JSON.parse(body)
            if (Array.isArray(data) && data.length > 0) {
                data.forEach((item, index) => {
                    console.log(`\nCelebrity ${index + 1}:`)
                    for (const key in item) {
                        if (item.hasOwnProperty(key)) {
                            console.log(
                                `${key.charAt(0).toUpperCase() + key.slice(1)}: ${item[key]}`
                            )
                        }
                    }
                })
            } else {
                console.log('No data found for this name.')
            }
        } catch (e) {
            console.error('Failed to parse response:', e)
        }
    }
)
