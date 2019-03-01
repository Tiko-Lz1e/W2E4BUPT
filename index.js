const TelegramBot = require('node-telegram-bot-api');
var config = require('./config.js');

const token = config.token;
const bot = new TelegramBot(token, {polling: true});

var num = 2;
var dishs = ['学5麻辣烫', '教5麻辣烫'];
var choice = -1;
var DishesChoose = [0, 0];
var ChooseNum = 0;

bot.onText(/\/ok/, msg =>{
	var answer = '';
	if(choice >= 0){
		ChooseNum += 1;
		console.log(choice);
		DishesChoose[choice] += 1;
		answer = 'OK! We will eat ';
		answer += dishs[choice];
		answer += ' today!';
		choice = -1;
	}
	else{
		answer += 'Sorry, you need send "/w2e" first.';
	}
	return bot.sendMessage(msg.chat.id, answer);
});

bot.onText(/\/del/, msg =>{
	console.log(`[/del] ${ msg.chat.id } ${ msg.text }`);
	var DelDish = `${ msg.text }`;
	console.log(DelDish);
	Did = 1;
	DelDish = DelDish.slice(5);
	Did = parseInt(DelDish, 10);
	var answer = '';
	if(Did <= num){
		if(Did != num) dishs[Did-1] = dishs[num-1];
		DishesChoose[Did-1] = 0;
		num = num - 1;
		answer += 'Success! Now you have ';
		answer += num.toString();
		answer += ' dishes in the menu.';
	}
	else{
		answer = "Sorry! You do not have this dish.";
	}
	return bot.sendMessage(msg.chat.id, answer);
});

bot.onText(/\/menu/, msg =>{
	var no = 1;
	var menu = '';
	for(no = 1; no <= num; no ++){
		menu += no.toString();
		menu += '.';
		menu += '\t\t';
		menu += dishs[no-1];
		menu += '\t\t';
		menu += DishesChoose[no-1].toString();
		menu += '\n';
	}

	return bot.sendMessage(msg.chat.id, menu);		
});

bot.onText(/\/add/, msg =>{
	console.log(`[/add] ${ msg.chat.id } ${ msg.text }`);
	var AddDish = `${ msg.text }`;
	AddDish = AddDish.slice(5);
	console.log(AddDish);
	var answer = '';

	if(AddDish.length >= 4){
		dishs[num] = AddDish;
		DishesChoose[num] = 0;
		num += 1;
		answer += 'Success! Now you have ';
		answer += num.toString();
		answer += ' dishes in the menu.';
	}
	else{
		answer = 'Sorry! The name is too short.';
	}

	return bot.sendMessage(msg.chat.id, answer);
});

bot.onText(/\/w2e/, msg =>{
	
	var ans = '';
	
	var Did = Math.round(Math.random() * (num - 1)); 
	ans += dishs[Did];
	choice = Did;
	const opts = {
		reply_markup: {
		  inline_keyboard: [
			[
			  {
				text: 'OK',
				callback_data: Did,
			  }
			]
		  ]
		}
	};
	console.log(`[/w2e] ${ msg.chat.id } ${ msg.text }`);
	return bot.sendMessage(msg.chat.id, ans, opts);
});

bot.on("callback_query", function(callbackQuery) {
    // 'callbackQuery' is of type CallbackQuery
	//console.log(callbackQuery);
	const action = callbackQuery.data;
	const msg = callbackQuery.message;
	const opts = {
    	chat_id: msg.chat.id,
    	message_id: msg.message_id,
	};

	var answer = '';
	if(choice >= 0){
		ChooseNum += 1;
		console.log(action);
		DishesChoose[action] += 1;
		answer = 'OK! We will eat ';
		answer += dishs[action];
		answer += ' today!';
		choice = -1;
	}
	else{
		answer += 'Sorry, you need send "/w2e" first.';
	}
	bot.editMessageText(answer, opts);
});

bot.onText(/\/num/, msg =>{
	return bot.sendMessage(msg.chat.id, ChooseNum);
});