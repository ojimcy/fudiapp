const { Telegraf } = require('telegraf');

const TOKEN = '7121075747:AAEge3ZY3rozDKAqZWjcKNMRk3y-njzFVrU';

const web_link =
  'https://65ecd454acb6fdee4430cce6--benevolent-pithivier-9675f9.netlify.app/';
const bot = new Telegraf(TOKEN);
bot.start((ctx) =>
  ctx.reply(`Welcome`, {
    reply_markup: {
      keyboard: [[{ text: 'Fudi App', web_app: { url: web_link } }]],
    },
  })
);
bot.launch();
