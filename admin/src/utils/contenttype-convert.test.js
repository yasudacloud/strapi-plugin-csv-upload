'use strict';
const {stringToContentType} = require('./convert')

describe('contenttype-convert', () => {
  describe('Testing String to Content Type', () => {
    test('', () => {
      const result = stringToContentType([
        {
          is_true: 'true',
          is_false: 'false',
          is_num: '123',
          is_str: 'hoge',
        },
      ], {
        is_true: {type: 'boolean'},
        is_false: {type: 'boolean'},
        is_num: {type: 'integer'},
        is_str: {type: 'string'},
      })
      expect(result).toEqual([{is_true: true, is_false: false, is_num: 123, is_str: 'hoge'}])
    })
  })
})
