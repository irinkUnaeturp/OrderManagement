//введение
const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '',
  APISECRET: '',
  baseURL: 'https://fapi.binance.com'
});

const symbol = "UNIUSDT"
const quantity = 1
const price = 6
const stopPrice= 6.9
const targetPrice= 6.9

const BinanceClient = async() => {

const openLongPosition= await binance.futuresBuy(symbol, quantity, price)//Открывает лонг-позицию на указанном символе (торговой паре) с указанным количеством и ценой входа.

  console.log(openLongPosition)

 const openShortPosition = await binance.futuresSell  (symbol, quantity, price,{type: 'LIMIT', timeInForce: 'GTC'})//Открывает шорт-позицию на указанном символе (торговой паре) с указанным количеством и ценой входа.
  
console.log(openShortPosition)

const setTakeProfit =  await binance.futuresSell (symbol, quantity, targetPrice,{  type: 'STOP', timeInForce: 'GTC'})//Устанавливает уровень тейк-профита для указанной позиции.
  
console.log(setTakeProfit)
const setStopLoss = await binance.futuresSell(symbol,  quantity, stopPrice, { type: 'TAKE_PROFIT', timeInForce: 'GTC'})//Устанавливает уровень стоп-лосса для указанной позиции.
  console.log(setStopLoss)
const  closePosition = await binance.futuresMarketSell(symbol, quantity) //Закрывает позицию по рыночной цене.
  
  console.log(closePosition)
} 

BinanceClient()