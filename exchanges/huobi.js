"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var crypto = require("crypto");
var creds = {
    "api": "vftwcr5tnh-59cfc143-709c63ab-51e5f",
    "key": "d69271ce-188f246f-c68e537f-83dcf"
};
var huobi = {
    APIKEY: "vftwcr5tnh-59cfc143-709c63ab-51e5f",
    APISECRET: "d69271ce-188f246f-c68e537f-83dcf",
    apiBaseUrl: 'https://api.hbdm.com',
    SignatureMethod: "HmacSHA256",
    SignatureVersion: 2,
    accountId: '479198145',
};
var formattedTimestamp = new Date().toISOString().slice(0, 19) + "Z";
var params = {
    AccessKeyId: huobi.APIKEY,
    SignatureMethod: huobi.SignatureMethod,
    SignatureVersion: huobi.SignatureVersion,
    Timestamp: encodeURIComponent(formattedTimestamp),
};
var queryParams = Object.keys(params).map(function (key) { return "".concat(key, "=").concat(params.AccessKeyId); }).join('&');
var method = 'POST';
var endPoint = '/api/v1/contract_order';
var preSignedText = "".concat(method, "\n").concat(huobi.apiBaseUrl.replace('https://', '').split('/')[0], "\n").concat(endPoint, "\n").concat(queryParams, "\n");
var signature = crypto.createHmac('sha256', huobi.APIKEY).update(preSignedText).digest('base64');
var signedUrl = "".concat(huobi.apiBaseUrl).concat(endPoint, "?AccesKeyId=").concat(huobi.APIKEY, "&SignatureMethod=").concat(params.SignatureMethod, "&SignatureVersion=").concat(params.SignatureVersion, "&Timestamp=").concat(formattedTimestamp, "&Signature=").concat(signature);
console.log('signedUrl:', signedUrl);
function createOrder() {
    return __awaiter(this, void 0, void 0, function () {
        var body, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = {
                        symbol: "UNIUSDT",
                        type: 'buy-limit',
                        direction: 'buy',
                        amount: 1,
                        price: 6,
                        orderPriceType: "limit",
                        offset: 'open',
                        volume: 1
                    };
                    return [4 /*yield*/, fetch(signedUrl, {
                            method: method,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(body),
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    return [2 /*return*/];
            }
        });
    });
}
createOrder().then(function (res) { return console.log(res); });
