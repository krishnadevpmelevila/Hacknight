const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

// command handler
const commands = [
    new SlashCommandBuilder().setName('gettweetbyhashtag').setDescription('Get Tweets from hashtag')
            .setDescription('Enter hashtag to load specific count of tweet from that hashtag').addStringOption(option =>
                option.setName('hashtag')
                    .setDescription('Enter Hashtag')
                    .setRequired(true),
               
            

            ).addStringOption(option =>
                option.setName('count')
                    .setDescription('Enter no of tweets needed')
                    .setRequired(true),
            )]
    .map(command => command.toJSON());
            
const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);