require('dotenv').config()

function getBaseUrl() {
  return '/api'
}

const config = {
  header: {
  },
  database: {
  },
  baseURL: getBaseUrl(),
  dateFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  api: {
    port: process.env.HTTP_PORT || 3000,
    // logger: process.env.LOGGER === 'true' || false
  }
}

module.exports = config