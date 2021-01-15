const babelJest = require("babel-jest");

const cookieData = "_ga=GA1.1.1653634107.1545274451; _gcl_au=1.1.2010188769.1545623665; __utmz=111872281.1546626176.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _ck_form=%7B%224375%22%3A%7B%22shown%22%3A%222019-02-09T20%3A48%3A47.291Z%22%7D%2C%225999%22%3A%7B%22shown%22%3A%222019-02-09T20%3A48%3A47.284Z%22%7D%7D; __utmx=111872281.$0:; __utmxx=111872281.$0:1549760799:8035200; ki_t=1549760799645%3B1549760799645%3B1549760799645%3B1%3B1; ki_r=; _hp2_id.undefined=%7B%22userId%22%3A%227650991145232682%22%2C%22pageviewId%22%3A%220228038566550561%22%2C%22sessionId%22%3A%228885090043010302%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __atuvc=2%7C7; __utma=111872281.1653634107.1545274451.1549867227.1550336391.11; auth=j%3A%7B%22username%22%3A%22brandon%22%2C%22password%22%3A%22%22%7D"


// describe('gets cookie and returns cookie info', () => {
//   const expectedCookieName = 'auth'
//   const parseCookies = jest.fn( cookiesData => {
//     var cookies = cookiesData.split(';')
//
//     return cookies ? cookies.map((cookie, index) => (
//       {
//         [cookie.split('=')[0].trim()]: cookie.split('=')[1]
//       }
//     )) : false;
//   })
//   const cookies = parseCookies(cookieData)
//   const cookieIndex = cookies.indexOf(cookies.find(c => c[expectedCookieName]))
//
// // console.log('cookie prop: ',cookies.find(c => c[expectedCookieName]))
//
//   test('checks if cookie type = object', () => {
//     expect(typeof cookies[cookieIndex]).toEqual('object')
//   })
//
//   test('cookie with key '+ expectedCookieName +' exist', () => {
//     expect(cookieIndex).toBeGreaterThan(0)
//
//   })
//
//   test('check for cookie object', () => {
//     expect(cookies[cookieIndex]).toHaveProperty(expectedCookieName)
//   })
//
//   test('cookie data is not NULL', () => {
//     expect(cookies).toBeDefined()
//   })
// })
