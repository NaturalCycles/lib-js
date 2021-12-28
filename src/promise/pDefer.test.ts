import { pExpectedError } from '../error/try'
import { pDefer } from './pDefer'

test('pDefer', async () => {
  let p = pDefer<string>()
  p.resolve('a')
  expect(await p).toBe('a')

  p = pDefer<string>()
  p.reject(new Error('abc'))
  expect(await pExpectedError(p)).toMatchInlineSnapshot('[Error: abc]')
})
