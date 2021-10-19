const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);


 


bot.start((ctx) => {

    let message = ` Hello ${ctx.from.first_name}, Welcome to the Shashwat Alight_Bot.\n This bot will send you Random Memes, Random Quote, Random Mathematical Fact \n  \n Any suggestion or Edits click here    https://github.com/ShashwatAlight/Shashwat-Alight_Bot`
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'NewMathsFact', callback_data: 'NewMathsFact' }],
                [{ text: 'Memes', callback_data: 'Memes' }],
                [{ text: 'Jokes', callback_data: 'Jokes' }]
            ]
        }



    });


})


bot.action('NewMathsFact', (ctx) => {
    ctx.answerCbQuery('Your fact is Here');

    
                  axios.get("http://numbersapi.com/random/math?json")
                   .then(res => {
                   bot.telegram.sendMessage(ctx.chat.id, res.data.text, {
                    reply_markup: {
                    inline_keyboard: [
                        [{ text: 'NewMathsFact', callback_data: 'NewMathsFact' }],
                        [{ text: 'Memes', callback_data: 'Memes' }],
                        [{ text: 'Jokes', callback_data: 'Jokes' }]
                                     ]
                                   }



                        });
                        // console.log(res.data.text);
                     })
                     .catch(e => {
            console.log(e);
        })

     

})


    bot.action('Jokes', (ctx) => {
        ctx.answerCbQuery('Your Joke is Here');

        
        axios.get("https://raw.githubusercontent.com/15Dkatz/official_joke_api/master/jokes/index.json")
            .then(res => {

                let randomNum = Math.floor(Math.random()*350);
                let jokesData = res.data[randomNum];

                let finalJoke = "This Joke is just for You" +"\n" +"\n" + ` Joke: " ${jokesData.setup}" `+ "\n"+"\n" + `"punchline: ${jokesData.punchline}"` ;

                bot.telegram.sendMessage(ctx.chat.id, finalJoke, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'NewMathsFact', callback_data: 'NewMathsFact' }],
                            [{ text: 'Memes', callback_data: 'Memes' }],
                            [{ text: 'Jokes', callback_data: 'Jokes' }]
                        ]
                    }



                });
                // console.log(res.data[0]);
            }).catch(e => {
                console.log(e);
            })

        



    })

    bot.action('Memes', (ctx) => {
        ctx.answerCbQuery('Your Meme is Here');

        
        axios.get("https://meme-api.herokuapp.com/gimme")
            .then(res => {
                bot.telegram.sendPhoto(ctx.chat.id, res.data.url, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'NewMathsFact', callback_data: 'NewMathsFact' }],
                            [{ text: 'Memes', callback_data: 'Memes' }],
                            [{ text: 'Jokes', callback_data: 'Jokes' }]
                        ]
                    }



                }); 
                // console.log(res.data.title);
                // console.log(res.data.url);

                // bot.telegram.sendPhoto(ctx.chat.id,res.data.url)
            }).catch(e => {
                console.log(e);
            })

      



    })

    bot.help((ctx) => ctx.reply('Send me a sticker'))


    bot.on('sticker', (ctx) => ctx.reply('👍'))

 
    bot.hears('hi', (ctx) => ctx.reply('Hey there, What do you want to us'))

 

    bot.command(["Quote", "NewMathsFact"], (ctx) => {

        axios.get("http://numbersapi.com/random/math?json")
            .then(res => {
                bot.telegram.sendMessage(ctx.chat.id, res.data.text, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'NewMathsFact', callback_data: 'NewMathsFact' }],
                            [{ text: 'Memes', callback_data: 'Memes' }],
                            [{ text: 'Memes', callback_data: 'Memes' }]
                        ]
                    }



                });
                console.log(res.data.text);
            }).catch(e => {
                console.log(e);
            })
    })


    bot.launch()
 



 