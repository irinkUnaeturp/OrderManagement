const fs = require('fs');
import * as crypto from 'crypto';


const huobi = {
  APIKEY: creds.api,
  APISECRET: creds.key,
  apiBaseUrl: 'https://api.hbdm.com',
  SignatureMethod: "HmacSHA256",
  SignatureVersion: 2,
  accountId: '479198145',
};

const formattedTimestamp = new Date().toISOString().slice(0, 19) + "Z";

const params = {
  AccessKeyId: huobi.APIKEY,
  SignatureMethod: huobi.SignatureMethod,
  SignatureVersion: huobi.SignatureVersion,
  Timestamp: encodeURIComponent(formattedTimestamp),
};



const queryParams = Object.keys(params).map(key => `${key}=${params.AccessKeyId}`).join('&');

const method = 'POST';
const endPoint = '/api/v1/contract_order';
const preSignedText = `${method}\n${huobi.apiBaseUrl.replace('https://', '').split('/')[0]}\n${endPoint}\n${queryParams}\n`;

const signature = crypto.createHmac('sha256', huobi.APIKEY).update(preSignedText).digest('base64');
const signedUrl = `${huobi.apiBaseUrl}${endPoint}?AccesKeyId=${huobi.APIKEY}&SignatureMethod=${params.SignatureMethod}&SignatureVersion=${params.SignatureVersion}&Timestamp=${formattedTimestamp}&Signature=${signature}`;
console.log('signedUrl:', signedUrl);


async function createOrder() {
  const body = {
    symbol: "UNIUSDT",
    type: 'buy-limit',
    direction: 'buy',
    amount: 1,
    price: 6,
    orderPriceType: "limit",
    offset: 'open',
    volume: 1
  };

  const response = await fetch(signedUrl, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  console.log(data);
}

createOrder().then(res => console.log(res));