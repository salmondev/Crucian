const Command = require('../../interfaces/Command.js');

class Kick extends Command {
    constructor(file) {
        super(file, {
            name: 'kick',
            description: 'Kicks the mentioned user',
            usage: 'kick #{mention} #{reason}',
            aliases: ['banish', 'expel', '강퇴', '추방'],
            cooltime: 5000,
            isOwnerOnly: true
        });
    }

    async run(bot, message, args) {
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);
            
            return;
        }

        let user = message.mentions.users.first();

        if (!user) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        if (!message.guild.member(user).kickable) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let reason = args.slice(1).join(' ');

        message.guild.member(user)
            .kick(reason)
            .then(() => {
                message.channel.send(bot.lang.kickSuccess.random().format(user.username, reason));
            })
            .catch(console.error);
    }
}

module.exports = Kick;
