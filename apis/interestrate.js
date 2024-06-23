const request = require('request')
require('dotenv').config()

const apiKey = process.env.API_KEY_API_NINJAS

if (!apiKey) {
    console.error('API key is missing. Please add it to the .env file.')
    process.exit(1)
}

request.get(
    {
        url: 'https://api.api-ninjas.com/v1/interestrate',
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
            if (Array.isArray(data)) {
                data.forEach((item, index) => {
                    console.log(`\nInterest Rate ${index + 1}:`)
                    for (const key in item) {
                        if (item.hasOwnProperty(key)) {
                            console.log(
                                `${key.charAt(0).toUpperCase() + key.slice(1)}: ${item[key]}`
                            )
                        }
                    }
                })
            } else {
                console.log(
                    'Unexpected response format:',
                    JSON.stringify(data, null, 2)
                )
            }
        } catch (e) {
            console.error('Failed to parse response:', e)
        }
    }
)
