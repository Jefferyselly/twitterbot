// bot.js
const express = require('express')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
// This file would be created soon
const parser = require('./parser.js');

const forexage_data = require('./forexage_data.js')



require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;
let bot;

if (process.env.NODE_ENV === 'production') {
   bot = new TelegramBot(token);
   bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
   bot = new TelegramBot(token, { polling: true });
}

// Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

// Listen for any kind of message. There are different kinds of
// messages.

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  //get the keyword searc for and match via the data.

  const text = msg.text;

  for(let i = 0; i < forexage_data.length; i++){
  	if(text == forexage_data[i].key){
  		 bot.sendMessage(chatId,forexage_data[i].description);
  	}
  }



  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId,'Received you r message');
});

app.listen(process.env.PORT);

app.post('/' + bot.token, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});