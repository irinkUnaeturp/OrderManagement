const HmacSHA256 = require('crypto-js/hmac-sha256');
const Base64 = require('crypto-js/enc-base64');

class okex {
  private apiKey: ''
  private secret: ''
  private password: ''

  constructor(apiKey: any, secret: any, password: any) {
    this.apiKey = apiKey;
    this.secret = secret;
    this.password = password;
  }

  async main() {

    const timestamp = new Date().toISOString();
    const method = 'POST';
    //const request = '/api/v5/account/balance'; //for check balance
    const request = "/api/v5/trade/order"//for place spot or future order stop-loss or take profit order
    //const request = "/api/v5/trade/close-position"//for close position
    const body = {
      //"mgnMode": "isolated",//for close position
      "tdMode": "isolated",//for place future order
      "side": "buy",
      "quickMgnType":"manual",
      "ordType": "market",
      "instId": "XRP-USDT-240628",
      "direction": "long",
      "sz": "2",
      "slOrdPx": "0.5",
      "tpOrdPx": "0.5",
      "tpTriggerPx":"0.7",
     "slTriggerPx": "0.4",
    }
    /*const body1 = {
      //"mgnMode": "isolated",//for close position
      "tdMode": "isolated",//for place future order
      "side": "buy",
      "ordType": "market",
      "instId": "EOS-USD-240216",
      "direction": "short",
      "sz": "1",
      "slOrdPx": "0.7",
      "tpOrdPx": "0.7",
      "tpTriggerPx":"0.9",
      "slTriggerPx": "0.6",
    }*/
    const headers = ({
      'Content-Type': 'application/json',
      'OK-ACCESS-KEY': this.apiKey,
      'secret': this.secret,
      'OK-ACCESS-PASSPHRASE': this.password,
      'OK-ACCESS-TIMESTAMP': timestamp,
      'baseUrl': "https://www.okx.com"
    });
    const sign = Base64.stringify(HmacSHA256(timestamp + 'POST' + request + JSON.stringify(body), headers.secret))
    console.log("sign:", sign)

    //CHECK BALANCE
    /*const url = headers.baseUrl + request
    const getBalance = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'OK-ACCESS-KEY': this.apiKey,
        "OK-ACCESS-SIGN": sign,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'OK-ACCESS-PASSPHRASE': this.password,
      },
       //"body": JSON.stringify(body)
    })

    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(error => {
        console.log(error)
    });*/


    //PLACE FUTURE_SHORT ORDER
    const url = headers.baseUrl + request
    const placeShortOrder = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'OK-ACCESS-KEY': this.apiKey,
        "OK-ACCESS-SIGN": sign,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'OK-ACCESS-PASSPHRASE': this.password,
      },
      "body": JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch(error => {
        console.log(error)
      })
    //PLACE FUTURE_LONG ORDER
    /*const placeLongOrder = await fetch(url,{
      method: method,
      headers:{
        'Content-Type': 'application/json',
        'OK-ACCESS-KEY': this.apiKey,
        "OK-ACCESS-SIGN": sign,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'OK-ACCESS-PASSPHRASE': this.password,
      },
      "body": JSON.stringify(body1)
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(error => {
        console.log(error)
    })*/
  }
}
const okexInstance = new okex(

  "",
  '',
  ''
);

okexInstance.main();

