require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const spotify = require('./spotify')
const messages = require('../data/messages')

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling:true})

bot.on('polling_error', error => {
    console.log(error);
})

setBotEventsForCommands(bot)
setBotEventsForMessages(bot)

function setBotEventsForMessages(bot) {
    for(let message of messages.messagesForMatches) {
        bot.onText(message.matches, msg => {
            bot.sendMessage(msg.chat.id, message.response)
        })
    }
}

function setBotEventsForCommands(bot) {
    bot.onText(/^\/start/, msg => {
        const chatId = msg.chat.id
        const nameUser = msg.from.first_name
        
        bot.sendMessage(chatId, messages.welcomeMessage(nameUser))
    })

    bot.onText(/^\/featuredplaylistsusa/, msg => {
        const chatId = msg.chat.id
        getFeaturedPlaylists('US', bot, chatId)
    })

    bot.onText(/^\/featuredplaylistsuk/, msg => {
        const chatId = msg.chat.id
        getFeaturedPlaylists('GB', bot, chatId)
    })

    bot.onText(/^\/featuredplaylistsspain/, msg => {
        const chatId = msg.chat.id
        getFeaturedPlaylists('ES', bot, chatId)
    })

    bot.onText(/^\/newalbums/, msg => {
        const chatId = msg.chat.id
        getNewAlbums('ES', bot, chatId)
    })
}

function getFeaturedPlaylists(countryCode, bot, chatId) {
    spotify.findFeaturedPlaylists(countryCode)
        .then(playlists => {
            for(let playlist of playlists.slice(0,5)) {
                const message = playlist.name + ' - ' + playlist.description
                bot.sendMessage(chatId, message + ': ' + playlist.external_urls.spotify)
            }
        }).catch(error => console.log(error.message))
}

function getNewAlbums(countryCode, bot, chatId) {
    countryCode = 'ES'
    spotify.findNewAlbums(countryCode)
        .then(releases => {
            for(let release of releases.slice(0,5)) {
                const message = release.name + ' - ' + release.artists[0].name + ' - ' + release.total_tracks + ' tracks'
                bot.sendMessage(chatId, message + ': ' + release.external_urls.spotify)
            }
        }).catch(error => console.log(error.message))
}