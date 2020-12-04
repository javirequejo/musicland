require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const { findSpotifyFeaturedPlaylists } = require('./spotify')

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling:true})

bot.on('polling_error', error => {
    console.log(error);
})

bot.onText(/^\/start/, msg => {
    const chatId = msg.chat.id
    const nameUser = msg.from.first_name
    
    bot.sendMessage(chatId, "Bienvenido al mejor bot de recomendaciones de música " + nameUser)
    bot.sendMessage(chatId, "/topplaylistsspain - Descubre las top playlists en Spotify España")
})

bot.onText(/^\/topplaylistsspain/, msg => {
    const chatId = msg.chat.id
    const nameUser = msg.from.first_name
    findSpotifyFeaturedPlaylists()
        .then(playlists => {
            for(let playlist of playlists.slice(0,5)) {
                const message = playlist.name + ' - ' + playlist.description
                bot.sendMessage(chatId, message + ': ' + playlist.external_urls.spotify)
            }
        }).catch(error => console.log(error.message))
})

bot.onText(/^\hola/, msg => {
    console.log(msg)
    bot.sendMessage(msg.chat.id, "Hola " + msg.from.first_name)
 })