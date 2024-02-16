var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var HmacSHA256 = require('crypto-js/hmac-sha256');
var Base64 = require('crypto-js/enc-base64');
var okex = /** @class */ (function () {
    function okex(apiKey, secret, password) {
        this.apiKey = apiKey;
        this.secret = secret;
        this.password = password;
    }
    okex.prototype.main = function () {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp, method, request, body, headers, sign, url, placeShortOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestamp = new Date().toISOString();
                        method = 'POST';
                        request = "/api/v5/trade/order" //for place spot or future order stop-loss or take profit order
                        ;
                        body = {
                            //"mgnMode": "isolated",//for close position
                            "tdMode": "isolated", //for place future order
                            "side": "buy",
                            "quickMgnType": "manual",
                            "ordType": "market",
                            "instId": "XRP-USDT-240628",
                            "direction": "long",
                            "sz": "2",
                            "slOrdPx": "0.5",
                            "tpOrdPx": "0.5",
                            "tpTriggerPx": "0.7",
                            "slTriggerPx": "0.4",
                        };
                        headers = ({
                            'Content-Type': 'application/json',
                            'OK-ACCESS-KEY': this.apiKey,
                            'secret': this.secret,
                            'OK-ACCESS-PASSPHRASE': this.password,
                            'OK-ACCESS-TIMESTAMP': timestamp,
                            'baseUrl': "https://www.okx.com"
                        });
                        sign = Base64.stringify(HmacSHA256(timestamp + 'POST' + request + JSON.stringify(body), headers.secret));
                        console.log("sign:", sign);
                        url = headers.baseUrl + request;
                        return [4 /*yield*/, fetch(url, {
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
                                .then(function (response) { return response.json(); })
                                .then(function (data) { return console.log(data); })
                                .catch(function (error) {
                                console.log(error);
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
                        ];
                    case 1:
                        placeShortOrder = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return okex;
}());
var okexInstance = new okex("a267747b-d803-45d4-bc88-3fb4e8c6e302", '5C183B0A06716961B37A7B4DC3701928', 'cufzeg-7xipce-Qofviq');
okexInstance.main();
