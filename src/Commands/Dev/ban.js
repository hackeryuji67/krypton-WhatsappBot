module.exports.execute = async (client, flag, arg, M) => {
    if (M.quoted?.participant) M.mentions.push(M.quoted.participant)
    if (!M.mentions.length) return M.reply('🟥 *Mentions are required to Ban*')
    const mentions = client.utils.removeDuplicates(M.mentions)
    const banned = (await client.DB.get('banned')) || []
    mentions.filter(async (user) =>
        !banned.includes(user)
            ? (await client.DB.push('banned', user)) &&
              (await client.sendMessage(
                  M.from,
                  { text: `🟩 *@${user.split('@')[0]}* is now banned`, mentions: [user] },
                  { quoted: M }
              ))
            : await client.sendMessage(
                  M.from,
                  { text: `🟨 *@${user.split('@')[0]}* is already banned`, mentions: [user] },
                  { quoted: M }
              )
    )
}

module.exports.command = {
    name: 'ban',
    aliases: ['b'],
    exp: 0,
    category: 'dev',
    usage: '[mention user | quote user]',
    description: 'Bans the taged user'
}
