const axios = require('axios')
const qs = require('qs')

const SPOTIFY_AUTHORIZATION_URL = 'https://accounts.spotify.com/api/token'
const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1'

const getSpotifyToken = async () => {
    try {
        const authorizationOptions = {
            method: 'post',
            url: SPOTIFY_AUTHORIZATION_URL,
            params: {
                grant_type: 'client_credentials'
            },
            headers: { 
                'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded' 
            }
        }
        const response = await axios(authorizationOptions)
        return response.data.access_token
    } catch (error) {
        console.log('Error in catch of token')
        console.log(error.response.data)
    }
}

module.exports.findFeaturedPlaylists = async (countryCode) => {
    try {
        const token = await getSpotifyToken()
        if (token) {
            const options = {
                method: 'get',
                url: `${SPOTIFY_BASE_URL}/browse/featured-playlists`,
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                params: {
                    country: countryCode
                }
            }
            const response = await axios(options)
            return response.data.playlists.items
        }
    } catch (error) {
        console.log('Error in catch of featured playlists')
        console.log(error)
    }
}

module.exports.findNewAlbums = async (countryCode) => {
    try {
        const token = await getSpotifyToken()
        if (token) {
            const options = {
                method: 'get',
                url: `${SPOTIFY_BASE_URL}/browse/new-releases`,
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                params: {
                    country: countryCode
                }
            }
            const response = await axios(options)
            return response.data.albums.items
        }
    } catch (error) {
        console.log('Error in catch of new releases')
        console.log(error)
    }
}