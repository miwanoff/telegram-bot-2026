
// configuration
let apiToken = "YOU_TELEGRAM_TOKEN";
let appUrl   = "YOUR_APPSCRIPT_URL";
let apiUrl = "https://api.telegram.org/bot" + apiToken;

let command = {
  "/start": "welcome to my bot",
  "hi": "hello",
  "what is your name?": "my name is Kit Bot"
}

// set webhook
function setWebhook() {
  let url = apiUrl + "/setwebhook?url=" + appUrl;
  let res = UrlFetchApp.fetch(url).getContentText();
  Logger.log(res);
}

// handle webhook
function doPost(e) {
  try {
    let webhookData = JSON.parse(e.postData.contents);
    
    // Перевірка на наявність повідомлення (щоб бот не падав від редагувань або натискання кнопок)
    if (!webhookData.message || !webhookData.message.text) return;

    let from = webhookData.message.from.id;
    let text = webhookData.message.text;
    let sendText = ""; // Оголошуємо змінну тут

    if (typeof command[text] == 'undefined') {
      sendText = encodeURIComponent("command not found");
    } else {
      sendText = encodeURIComponent(command[text]);
    }

    let url = apiUrl + "/sendMessage?chat_id=" + from + "&text=" + sendText + "&parse_mode=HTML";
    let opts = { "muteHttpExceptions": true };
    UrlFetchApp.fetch(url, opts);
    
  } catch (error) {
    Logger.log("Error: " + error.toString());
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Method GET not allowed");
}