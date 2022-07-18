'use strict';
const {csvToJSON} = require('./convert')

describe('csv-convert', () => {
  describe('Testing csv data', () => {
    test('Normal Test', async () => {
      const result = await csvToJSON(`
1,2,3
4,5,6
      `, ["a", "b", "c"])
      expect(result).toEqual([{a: '1', b: '2', c: '3'}, {a: '4', b: '5', c: '6'}])
    })


    test('Data contains commas', async () => {
      const result = await csvToJSON(`
1,"hello, world",2`, ["a", "b", "c"])
      expect(result).toEqual([{a: '1', b: 'hello, world', c: '2'}])
    })

    test('Less than header', async () => {
      const result = await csvToJSON(`
1,2,3
4,5
`, ["a", "b", "c", "d", "e"])
      expect(result).toEqual([{a: '1', b: '2', c: '3'}, {a: '4', b: '5'}])
    })
  })

  test('More than a header', async () => {
    await csvToJSON(`
1,2,3
4,5,6,7
`, ["a", "b"]).catch(e => {
      expect(e).toEqual('It is not possible to import more data than the number of headers.')
    })
  })
})
