// configuration
let apiToken = "YOU_TELEGRAM_TOKEN";
let appUrl   = "YOUR_APPSCRIPT_URL";
let apiUrl = "https://api.telegram.org/bot" + apiToken;

let command = {
  "/start": { type: "text", text: "Hello welcome to my bot" },
  "hi": { type: "text", text: "Hello welcome to my bot" },
  "what is your name?": { type: "text", text: "my name is Kit bot" },
  "bye": { type: "text", text: "good bye!" },
  "amazon": {
    type: "image",
    text: "Amazon Logo",
    url: "https://companieslogo.com/img/orig/AMZN-e9f942e4.png",
  },
  "alibaba": {
    type: "image",
    text: "Alibaba Logo",
    url: "https://companieslogo.com/img/orig/BABA-2884ac04.png",
  },
  "apple": {
    type: "image",
    text: "Apple Logo",
    url: "https://companieslogo.com/img/orig/AAPL-bf1a4314.png",
  },
  "facebook": {
    type: "image",
    text: "Facebook Logo",
    url: "https://companieslogo.com/img/orig/FB-2d2223ad.png",
  },
}

function setWebhook() {
  let url = apiUrl + "/setwebhook?url=" + appUrl;
  let res = UrlFetchApp.fetch(url).getContentText();
  Logger.log(res);
}

function doPost(e) {
  try {
    let webhookData = JSON.parse(e.postData.contents);
    if (!webhookData.message || !webhookData.message.text) return;

    let from = webhookData.message.from.id;
    let text = webhookData.message.text.toLowerCase(); // Робимо регістр нечутливим

    let url = ""; // Оголошуємо url ТУТ, щоб вона була доступна всюди нижче
    let cmd = command[text];

    if (typeof cmd == 'undefined') {
      let sendType = "text";
      let sendText = "";
      if (text == "???") {
        sendText = "!!!";
      }
      else {

        sendText = encodeURIComponent("command not found");
      }
      url = apiUrl + "/sendMessage?chat_id=" + from + "&text=" + sendText + "&parse_mode=HTML";
    }
    else {
      let sendText = encodeURIComponent(cmd.text);
      if (cmd.type == "text") {
        url = apiUrl + "/sendMessage?chat_id=" + from + "&text=" + sendText + "&parse_mode=HTML";
      }
      else if (cmd.type == "image") {
        let sendImageUrl = encodeURIComponent(cmd.url);
        // Правильний параметр: parse_mode (з підкресленням)
        url = apiUrl + "/sendPhoto?chat_id=" + from + "&photo=" + sendImageUrl + "&caption=" + sendText + "&parse_mode=HTML";
      }
    }

    let opts = { "muteHttpExceptions": true };
    UrlFetchApp.fetch(url, opts);

  } catch (error) {
    Logger.log("Error: " + error.toString());
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Method GET not allowed");
}