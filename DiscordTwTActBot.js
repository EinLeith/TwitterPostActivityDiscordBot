const Discord = require('discord.js');
const Twit = require('twit');

// Set up the Twitter client
const T = new Twit({
  consumer_key: 'YOUR_CONSUMER_KEY',
  consumer_secret: 'YOUR_CONSUMER_SECRET',
  access_token: 'YOUR_ACCESS_TOKEN',
  access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET',
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,  // optional - requires SSL certificates to be valid.
});

// Set up the Discord client
const client = new Discord.Client();
client.login('BotToken'); // put in the token of your bot

// Set up the Discord channel ID where you want to send the tweets
const channelID = 'channelid'; // put in the channel id

// Set up a stream to track the @AccountName Twitter account
const stream = T.stream('statuses/filter', { track: '@AccountName' }); //put in the account name to track activity

// When a new tweet is posted by @AccountName, send it to the Discord channel
stream.on('tweet', tweet => {
  if (tweet.user.screen_name === 'AccountName') { //put in account name
    const embed = new Discord.MessageEmbed()
      .setTitle(tweet.user.name)
      .setURL(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`)
      .setColor('#1DA1F2')
      .setDescription(tweet.text)
      .setTimestamp(new Date(tweet.created_at))
      .setFooter('Posted by @AccountName'); // put in account name
    client.channels.cache.get(channelID).send(embed);
  }
});

// Log to the console when the bot is ready
client.once('ready', () => {
  console.log('Discord bot is ready!');
});