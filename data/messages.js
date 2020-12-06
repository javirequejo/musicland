//Bad indent to show the correct message

const commands = `/featuredplaylistsusa -> Discover the best american featured playlists on Spotify
/featuredplaylistsuk -> Discover the best english featured playlists on Spotify
/featuredplaylistsspain -> Discover the best spanish featured playlists on Spotify
/newalbums -> Discover the last albums on Spotify`

const welcomeMessage = (nameUser) => {
return `Hi ${nameUser}, welcome to Music Land, the best bot about music.
Discover what you can do with these simply commands:

${commands}`
}

const messagesForMatches = [
        { 
            matches: /^\b(hi|hi!|hello|hello!|hey|hey!|hola|hola!|buenas|buenas!)\b/,
            response: `Hello, how are you doing?\nWould you like to listen to some music? Try with a command:\n\n${commands}`
        },
    ]


module.exports = {welcomeMessage, messagesForMatches}