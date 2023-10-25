const list = [
    {
        id: 'general',
        font: 'Gҽɳҽɾαʅ',
        emoji: '🔰'
    },
    {
        id: 'dev',
        font: 'Dҽʋ',
        emoji: '👨‍💻'
    },
    {
        id: 'fun',
        font: 'Fυɳ',
        emoji: '🎡'
    },
    {
        id: 'music',
        font: 'Mυʂιƈ',
        emoji: '💠'
    },
    {
        id: 'media',
        font: 'Mҽԃια',
        emoji: '🔉'
    },
    {
        id: 'moderation',
        font: 'Mσԃҽɾαƚισɳ',
        emoji: '💮'
    },
    {
        id: 'utils',
        font: 'Uƚιʅʂ',
        emoji: '⚙️'
    },
    {
        id:'economy',
        font:'ЄƇƠƝMƳ',
        emoji:'💳'
    },
    {
        id: 'weeb',
        font: 'WҽҽႦ',
        emoji: '🎐'
    }
]

module.exports.execute = async (client, flag, arg, M) => {
    if (!arg) {
        let obj = {}
        client.cmd.forEach((item) => {
            if (obj[item.command.category]) obj[item.command.category].push(item.command.name)
            else {
                obj[item.command.category] = []
                obj[item.command.category].push(item.command.name)
            }
        })
        let base = `⛩️ *❯─「ᎯᎿᎻᎬᏁᎯ」─❮* ⛩️

👋 *Hello ${M.pushName}* I'm ${client.config.name} of Athena🤍!
        
🎋 *Visit our Website: coming soon....* 
        
This help menu is designed to help you get started with the bot.`
        base += '\n\n ⟾ *🎁ＣＯＭＭＡＮＤ ＬＩＳＴ🎁*'
        const keys = Object.keys(obj).filter((c) => c !== 'dev')
        for (const key of keys) {
            const data = list.find((x) => x.id.toLowerCase() === key.toLocaleLowerCase())
            base += `\n\n *❯──「${data?.font}」──❮* \n➪ \`\`\`${obj[key].join(', ')}\`\`\``
        }
        base += '\n\n'
        base += `*📇 Notes:*
*➪ Use ${client.config.prefix}help <command name> from help the list to see its description and usage*
*➪ Eg: ${client.config.prefix}help profile*
*➪ <> means required and [ ] means optional, don't include <> or [ ] when using command.*`
        await client.sendMessage(
            M.from,
            {
                video: await client.utils.getBuffer('https://media.tenor.com/QHpICcsD_QAAAAPo/marin-nervous.mp4'),
                caption: base,
                gifPlayback: true
            },
            {
                quoted: M
            }
        )
        return
    }
    const command =
        client.cmd.get(arg)?.command ??
        client.cmd.find((cmd) => cmd.command.aliases && cmd.command.aliases.includes(arg))?.command
    if (!command) return M.reply('🚧 *Command does not exsist*')
    M.reply(
        `*🎗 Name:* ${command.name}\n*🌟 Exp:* ${command.exp}\n*👑 Admin:* ${
            command.category == 'moderation' ? 'Required' : 'Not_Required'
        }\n*⚙️ Category:* ${command.category} ${
            list.find((x) => x.id.toLowerCase() === command.category.toLocaleLowerCase()).emoji
        }\n*🚦 Aliases:* ${command.aliases.join(', ')}\n*💡 Usage:* ${client.config.prefix}${command.name} ${
            command.usage
        }\n*📕 Desc:* ${command.description}`
    )
}

module.exports.command = {
    name: 'help',
    aliases: ['h', 'menu', 'list', 'commands'],
    category: 'general',
    usage: '| [cmd]',
    exp: 10,
    description: 'Let you see the command list'
}
