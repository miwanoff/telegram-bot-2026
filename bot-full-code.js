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
};

// saveMessage

function saveMessage(webhookData) {
  try {
    let file = SpreadsheetApp.openById("Код з URL таблиці Google");
    let sheet = file.getSheets()[0];
    
    let chatId = webhookData.message.chat.id;
    let username = webhookData.message.from.username || "no_username";
    let text = webhookData.message.text || "no_text";
    let date = new Date();
    let fullLog = JSON.stringify(webhookData);

    sheet.appendRow([date, chatId, "@" + username, text, fullLog]);
  } catch (e) {
    console.log("Таблиця недоступна: " + e.toString());
  }
}

function doPost(e) {
  try {
    let webhookData = JSON.parse(e.postData.contents);
    if (!webhookData || !webhookData.message || !webhookData.message.text) return;

    // 1. Спроба зберегти в таблицю
    saveMessage(webhookData);

    let from = webhookData.message.from.id;
    let text = webhookData.message.text.toLowerCase();
    let cmd = command[text];
    
    // Готуємо базовий об'єкт відповіді
    let method = "sendMessage";
    let payload = {
      "chat_id": String(from),
      "parse_mode": "HTML"
    };

    // 2. Додаємо клавіатуру (переконайтеся, що вона є у файлі keyBoards.gs)
    if (typeof CUSTOM_KEYBOARD2 !== 'undefined') {
      payload.reply_markup = JSON.stringify(CUSTOM_KEYBOARD2);
    }

    // 3. Визначаємо контент
    if (typeof cmd == 'undefined') {
      payload.text = (text == "???") ? "!!!" : "Команду не знайдено 🤖";
    } else {
      if (cmd.type == "text") {
        method = "sendMessage";
        payload.text = cmd.text;
      } else if (cmd.type == "image") {
        method = "sendPhoto";
        payload.photo = cmd.url;
        payload.caption = cmd.text;
      }
    }

    // 4. ВІДПРАВКА (важливо використовувати правильні options)
    let options = {
      "method": "post",
      "contentType": "application/json", // Обов'язково для кнопок
      "payload": JSON.stringify(payload),
      "muteHttpExceptions": true
    };

    UrlFetchApp.fetch(apiUrl + "/" + method, options);

  } catch (error) {
    console.log("Критична помилка: " + error.toString());
  }
}

function setWebhook() {
  let url = apiUrl + "/setwebhook?url=" + appUrl;
  let res = UrlFetchApp.fetch(url).getContentText();
  Logger.log(res);
}

function authMe() {
  let ss = SpreadsheetApp.openById("Код з URL таблиці Google");
  Logger.log(ss.getName());
}