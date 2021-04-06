import * as functions from "firebase-functions";
import axios from "axios";
import moment from "moment";
import cheerio from "cheerio";
import Binance from "node-binance-api";

export const amundi = functions.https.onRequest(async (request, response) => {
  const symbol = request.query.symbol || "5528664-2946407";
  const now = moment().format("YYYYMMDD");

  const url = `https://www.amundi-ee.com/psAmundiEEPart/ezjscore/call/ezjscamundibuzz::sfForwardFront::paramsList=service=ProxyProductSheetFront&routeId=_fr-FR_745_${symbol}_object_graphiquehistovl?tabPos=3&eDate=${now}&devise=3&duration=3650`;
  const res = await axios.get(url);
  const html = res.data;

  const $ = cheerio.load(html);

  const data: any = [];

  $("table tbody tr").each((i: any, el: any) => {
    const dateRaw = $(el).children().first().text();

    const date = moment(dateRaw, "DD/MM/YYYY").unix();

    const value = $(el).find("td:nth-child(2)").text();
    data.push({ d: date, c: Number(value.replace(",", ".")) });
  });

  // ajout d'un cache CDN d'une journée
  response.setHeader("Cache-Control", "public, s-maxage=86400");

  response.send({
    d: {
      SymbolId: symbol,
      QuoteTab: data,
    },
  });
});

export const epsens = functions.https.onRequest(async (request, response) => {
  const product = request.query.product || "0tXGud2ZUGZjE_S6AZdHJ2dsIXZAiFDs";
  const now = moment().unix();
  const url = `https://www.epsens.com/fichefonds/datachart?product=${product}&type=vl&callback=jQuery19109582585583339243_1612903104709&_=${now}`;
  const res = await axios.get(url);
  const html = res.data;

  const data: any = [];

  const jquery = html.split("(")[1];
  const jquery2 = jquery.replace(")", "");
  const jqueryparse = JSON.parse(jquery2) as any;
  console.log("coucou2");

  jqueryparse.forEach((element: any) => {
    const date = moment(element[0]).unix();
    data.push({ d: date, c: element[1] });
  });

  // ajout d'un cache CDN d'une journée
  response.setHeader("Cache-Control", "public, s-maxage=86400");

  response.send({
    d: {
      QuoteTab: data,
    },
  });
});

const binance = new Binance().options({
  APIKEY: functions.config()?.binance?.apikey,
  APISECRET: functions.config()?.binance?.apisecret,
});

export const futuresExchangeInfo = functions.https.onCall(async () => {
  return binance.futuresExchangeInfo();
});

export const getBalances = functions.https.onCall(async (data) => {
  return await getBalance();
});

function getBalance() {
  return new Promise((resolve, reject) => {
    binance.balance((error, balances) => {
      if (error) return reject(error);
      resolve(balances);
    });
  });
}

export const prices = functions.https.onCall(async (data) => {
  return binance.prices();
});

export const toto = functions.pubsub
  .schedule("5 11 * * *")
  .timeZone("America/New_York") // Users can choose timezone - default is America/Los_Angeles
  .onRun((context) => {
    console.log("This will be run every day at 11:05 AM Eastern!");
    return null;
  });
