const axios = require('axios')

module.exports.execute = async (client, flag, arg, M) => {
    await axios
        .get(`https://nekos.life/api/v2/fact`)
        .then((response) => {
            // console.log(response);
            const text = `Fact for you: ${response.data.fact}`
            M.reply(text)
        })
        .catch((err) => {
            M.reply(`🔍 Error: ${err}`)
        })
}

module.exports.command = {
    name: 'fact',
    aliases: ['ft'],
    category: 'fun',
    exp: 5,
    usage: '',
    description: 'Sends random facts'
}
