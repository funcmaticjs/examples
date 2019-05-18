
const ISO8601MS = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/

describe('Response Format', () => {
  let func = null
  beforeEach(async () => {
    // Import our main function each time which
    // simulates an AWS "cold start" load
    func = require('../../app.js').func
  })
  afterEach(async () => {
    // We invoke any teardown handlers so that
    // middleware can clean up after themselves
    await func.invokeTeardown()
  })
  it ('should return statusCode of 200 OK', async () => {
    let ctx = { }
    await func.invoke(ctx)
    expect(ctx.response).toMatchObject({
      statusCode: 200
    })
  })
  it ('should return correct JSON body', async () => {
    let ctx = { }
    await func.invoke(ctx)
    expect(JSON.parse(ctx.response.body)).toMatchObject({
      hello: "world",
      time: expect.stringMatching(ISO8601MS)
    })
  })
})