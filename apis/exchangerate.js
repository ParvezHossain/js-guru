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

// Define the API URL and request options
const apiUrl = 'https://api.api-ninjas.com/v1/exchangerate?pair=USD_GBP'
const requestOptions = {
    url: apiUrl,
    headers: {
        'X-Api-Key': apiKey,
    },
}

// Make the API request
request.get(requestOptions, function (error, response, body) {
    if (error) {
        console.error('Request failed:', error)
        return
    }

    if (response.statusCode !== 200) {
        console.error('Error:', response.statusCode, body.toString('utf8'))
        return
    }

    try {
        const data = JSON.parse(body)
        console.log('Exchange Rate:')
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                console.log(
                    `${key.charAt(0).toUpperCase() + key.slice(1)}: ${data[key]}`
                )
            }
        }
    } catch (e) {
        console.error('Failed to parse response:', e)
    }
})
