import * as functions from 'firebase-functions'
const axios = require('axios')
const cheerio = require('cheerio')

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    const url =
      'https://www.amundi-ee.com/psAmundiEEPart/ezjscore/call/ezjscamundibuzz::sfForwardFront::paramsList=service=ProxyProductSheetFront&routeId=_fr-FR_745_5528664-2946407_object_graphiquehistovl?tabPos=3&bDate=20200201&eDate=20210131&devise=3&duration=365'
    const res = await axios.get(url)
    const html = res.data

    const $ = cheerio.load(html)

    const data: any = []
    $('table tbody tr').each((i: any, el: any) => {
      const date = $(el)
        .children()
        .first()
        .text()
      const value = $(el)
        .find('td:nth-child(2)')
        .text()
      data.push({ d: date, c: value })
    })

    response.send({
      d: {
        Name: 'AMUNDI ETF MSCI WR',
        SymbolId: '1rTCW8',
        Xperiod: '19',
        QuoteTab: data
      }
    })
  }
)
