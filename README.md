# w2e-telegram-bot

- INSTALL

  ```bash
  npm install
  ```

- CONFIG

  ```javascript
  /*config.js*/
  const config = {
      token: '',// your bot token
      method: {
      	polling: true,
      	request: { //optional
              proxy:''//add http proxy if necessary
      	}
      }
  };
  
  module.exports = config;
  ```

  

