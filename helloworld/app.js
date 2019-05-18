// npm install --save @funcmaticjs/funcmatic
const func = require('@funcmaticjs/funcmatic')

/**
 * This function will return JSON object in the following format for
 * any API Gateway request that utilizes Lambda Proxy Integration.
 * 
 * {
 *   "hello": "world",
 *   "time": [ event.toISOString() ]
 * }
 * 
 * @param {Object} ctx.event - An API Gateway Lambda Proxy Integration HTTP event
 * 
 * @returns {Object} A Lambda Proxy Integration response object by setting ctx.response
 */
func.request(async (ctx) => {
  let time = (new Date()).toISOString()

  // Funcmatic default logger which logs in JSON format to the console. 
  // For example, this line would get logged as:
  // { 
  //   level: 'info',
  //   leveln: 30,
  //   time: 1558216760359,
  //   lifecycle: 'request',
  //   component: 'AsyncFunction:[anonymous]',
  //   msg: 'Time is 2019-05-18T21:59:20.359Z' 
  // }
  ctx.logger.info(`Time is ${time}`)

  // Return a response in API Gateway's Lambda Proxy Integration format
  ctx.response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*"  // CORS
    },
    body: JSON.stringify({ 
      hello: "world",
      time
    }),
    isBase64Encoded: false
  }
})

// Create an AWS Lambda event handler with signature: async (event, context) => { ... }
let lambdaHandler = func.handler()

module.exports = {
  // This will be what AWS Lambda calls when invoking our function
  lambdaHandler,
  // Export func so that it can be unit tested: test/unit/app.test.js
  func
}
