const { Client, Collection, Intents, InteractionCollector, Message } = require('discord.js');
const { token,apiHost,apiKey } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { config } = require('dotenv');
const express = require('express');
const { text } = require('express');
const app = express();
app.listen(3000, () => console.log('Example app listening on port 3000!'))
app.get('/', (req, res) => res.send('Hello World!'))

// load config file
config();

// initiate bot
client.once('ready', () => {
    console.log('Bot is ready!');
});

// load commands
client.commands = new Collection();



// interaction initate
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    // function of gettweetbyhashtag
    if (interaction.commandName == 'gettweetbyhashtag') {
        // get inputs of user
        hashtag = interaction.options.getString('hashtag')
        count = interaction.options.getString('count')
        // check if count is integer
        if (isNaN(count)) {
            const messageId = await interaction.reply('Enter correct valuee for count (It should be an integer)');
        }
        // api call
        else {
            const options = {
                method: 'GET',
                url: `https://twitterfetch.p.rapidapi.com/hashtag/${hashtag}`,
                headers: {
                    'X-RapidAPI-Host': apiHost,
                    'X-RapidAPI-Key': apiKey
                }
            };

            axios.request(options).then(async function (response) {
                // declare array
                var tweets = []
                var authors = []
                var retweets = []

                // response to user
                for (let i = 0; i < count; i++) {
                    const tweet = response.data[i].text;
                    const author = response.data[i].user_screen_name;
                    const retweet = response.data[i].retweet_count;
                    // push to array
                    tweets.push(tweet)
                    authors.push(author)
                    retweets.push(retweet)
                }
                    // to captialize

                    // send message
                    await interaction.reply('Fetching...Please...Wait...');
                    for (let i = 0; i < count; i++) {
                        const embed = new MessageEmbed().setTitle(hashtag.toUpperCase()).setColor('#0099ff').setDescription(tweets[i]).addField('Author', authors[i]);

                        const messageId = await interaction.channel.send({ embeds: [embed] });
                        
                    }
                    
                }).catch(function (error) {
                    console.error(error);
            }).catch(function (error) {
                interaction.channel.send('Sorry! There is no tweets on that hashtag. Try another!');
            })
        }

    }



});
// clear chat stop



client.login(token);



