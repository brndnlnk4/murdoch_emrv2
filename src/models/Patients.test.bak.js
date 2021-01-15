const mockAxios = require('axios')

test('return patient files via axios', async () => {
  const $getData = ($dir) => mockAxios($dir)
  const $dirDataResponse = await $getData('')
  const $dataResolved = await $dirDataResponse

  expect($dirDataResponse).toBe(true)
  expect($dataResolved).toBe(true)
})
