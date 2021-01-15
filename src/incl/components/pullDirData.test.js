const file = require('file')
const path = require('path')

it('return files and directories', () => {
  const shallowLayer = file.walk('../')

  expect(shallowLayer).toEqual(true)
})
