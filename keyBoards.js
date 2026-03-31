let CUSTOM_KEYBOARD = {
    "keyboard": [
      [{ "text": "hi" }, { "text": "what is your name?" }, { "text": "bye" }]
    ],
    "resize_keyboard": true
};
 
 
  let CUSTOM_KEYBOARD2 = {
    "keyboard": [
      [{ "text": "amazon" }, { "text": "facebook" }],
      [{ "text": "alibaba" }, { "text": "apple" }]
    ],
    "resize_keyboard": true
  };
  
  let CUSTOM_KEYBOARD3 = {
    "keyboard": [
      [{ "text": "hi" }, { "text": "what is your name?" }],
      [{ "text": "bye" }]
    ],
    "resize_keyboard": true,
    "one_time_keyboard": true
  };
  
  let CUSTOM_KEYBOARD4 = {
    "keyboard": [
      [{ "text": "hi" }, { "text": "what is your name?" }],
      [{ "text": "bye" }]
    ],
    "resize_keyboard": true,
    "one_time_keyboard": true,
    "input_field_placeholder": "Текст - підказка"
  };
  
  let CUSTOM_KEYBOARD5 = {
    "keyboard": [
      [{ "text": "Кнопка 1 ❤️" }, { "text": "Кнопка 2 ✨" }],
      [{ "text": "Кнопка 3 🆗" }, { "text": "Кнопка 4 🔥" }, { "text": "Кнопка 5 ✔️" }],
      [{ "text": "Кнопка 6 ❤️‍🔥" }, { "text": "Кнопка 7 🏁" }]
    ],
    "resize_keyboard": true,
    "one_time_keyboard": true,
  };
  
  let REMOVE_KEYBOARD = {
    remove_keyboard: true
  };
  
  let PHONE_NO = {
    "keyboard": [
      [{ "text": "Send number", 'request_contact': true }]
    ],
    "resize_keyboard": true,
    "one_time_keyboard": true
  };
 
 
  let LOCATION_KEYBOARD = {
    "keyboard": [
      [{ "text": "Відправити місцезнаходження 🗺️️", 'request_location': true }]
    ],
    "resize_keyboard": true,
    "one_time_keyboard": true
  };
  
  let SWITCH_INLINE = {
    "inline_keyboard": [
      [{ "text": "Кнопка 1", 'switch_inline_query_current_chat': 'мій текст' }, { "text": "Кнопка 2", 'callback_data': "Кнопка 2" }]
    ]
  };
  
  let FORCE_REPLY = {
    "force_reply": true,
    "input_field_placeholder": "Ваш текст"
  };
