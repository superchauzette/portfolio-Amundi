import * as functions from 'firebase-functions'
import axios from 'axios'
import moment from 'moment'
import cheerio from 'cheerio'

export const amundi = functions.https.onRequest(async (request, response) => {
  const symbol = request.query.symbol || '2946407'
  const now = moment().format('YYYYMMDD')

  const url = `https://www.amundi-ee.com/psAmundiEEPart/ezjscore/call/ezjscamundibuzz::sfForwardFront::paramsList=service=ProxyProductSheetFront&routeId=_fr-FR_745_5528664-${symbol}_object_graphiquehistovl?tabPos=3&eDate=${now}&devise=3&duration=3650`
  const res = await axios.get(url)
  const html = res.data

  const $ = cheerio.load(html)

  const data: any = []

  $('table tbody tr').each((i: any, el: any) => {
    const dateRaw = $(el)
      .children()
      .first()
      .text()

    const date = moment(dateRaw, 'DD/MM/YYYY').unix()

    const value = $(el)
      .find('td:nth-child(2)')
      .text()
    data.push({ d: date, c: Number(value.replace(',', '.')) })
  })

  // ajout d'un cache CDN d'une journée
  response.setHeader('Cache-Control', 'public, s-maxage=86400')

  response.send({
    d: {
      SymbolId: symbol,
      QuoteTab: data
    }
  })
})
