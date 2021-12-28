// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { AnyFunction } from '../types'

export function convertHrtime(hrtime: [number, number]) {
  const nanoseconds = hrtime[0] * 1e9 + hrtime[1]
  const milliseconds = nanoseconds / 1e6
  const seconds = nanoseconds / 1e9

  return {
    seconds,
    milliseconds,
    nanoseconds,
  }
}

export function timeSpan(): () => number {
  const start = process.hrtime()
  const end = (type: string) => convertHrtime(process.hrtime(start))[type]

  const ret: any = () => end('milliseconds')
  ret.rounded = () => Math.round(end('milliseconds'))
  ret.seconds = () => end('seconds')
  ret.nanoseconds = () => end('nanoseconds')

  return ret
}

export function testEach(cases: any[][]): (name: string, fn: AnyFunction) => void {
  return (name, fn) => {
    cases.forEach(items => {
      test(name, () => fn(...items))
    })
  }
}
