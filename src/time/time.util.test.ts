import { mockTime } from '@naturalcycles/dev-lib/dist/testing'
import { _range } from '..'
import { _ms, _since } from './time.util'

beforeEach(() => {
  mockTime()
})

test('since', () => {
  expect(_since(1000, 1001)).toBe('1 ms')
  expect(_since(1000, 1010)).toBe('10 ms')
})

test('ms', () => {
  expect(_ms(1)).toBe('1 ms')
  expect(_ms(10)).toBe('10 ms')
  expect(_ms(999)).toBe('999 ms')
  expect(_ms(1000)).toBe('1 sec')
  expect(_ms(1001)).toBe('1.001 sec')
  expect(_ms(1005)).toBe('1.005 sec')
  expect(_ms(49123)).toBe('49 sec')
  expect(_ms(59123)).toBe('59 sec')
  expect(_ms(59923)).toBe('59 sec')
  expect(_ms(60000)).toBe('1m0s')
  expect(_ms(60912)).toBe('1m0s')
  expect(_ms(69123)).toBe('1m9s')
  expect(_ms(69500)).toBe('1m9s')
  expect(_ms(3292100)).toBe('54m52s')
  expect(_ms(59 * 60 * 1000 + 59 * 1000)).toBe('59m59s')
  expect(_ms(3599500)).toBe('59m59s')
  expect(_ms(3600000)).toBe('1h0m')
  expect(_ms(3732000)).toBe('1h2m')
  expect(_ms(69642430)).toBe('19h20m')
  expect(_ms(92694074)).toBe('26h')
  expect(_ms(101963481)).toBe('28h')
  expect(_ms(535963481)).toBe('6 days')
})

test('log progression', () => {
  const map = new Map<number, string>()
  let m = 700
  _range(1, 200).forEach(() => {
    // console.log(m, _ms(m))
    map.set(m, _ms(m))
    m = Math.round(m * 1.1)
  })
  expect(map).toMatchInlineSnapshot(`
Map {
  700 => "700 ms",
  770 => "770 ms",
  847 => "847 ms",
  932 => "932 ms",
  1025 => "1.025 sec",
  1128 => "1.128 sec",
  1241 => "1.241 sec",
  1365 => "1.365 sec",
  1502 => "1.502 sec",
  1652 => "1.652 sec",
  1817 => "1.817 sec",
  1999 => "1.999 sec",
  2199 => "2.199 sec",
  2419 => "2.419 sec",
  2661 => "2.661 sec",
  2927 => "2.927 sec",
  3220 => "3.220 sec",
  3542 => "3.542 sec",
  3896 => "3.896 sec",
  4286 => "4.286 sec",
  4715 => "4.715 sec",
  5187 => "5 sec",
  5706 => "5 sec",
  6277 => "6 sec",
  6905 => "6 sec",
  7596 => "7 sec",
  8356 => "8 sec",
  9192 => "9 sec",
  10111 => "10 sec",
  11122 => "11 sec",
  12234 => "12 sec",
  13457 => "13 sec",
  14803 => "14 sec",
  16283 => "16 sec",
  17911 => "17 sec",
  19702 => "19 sec",
  21672 => "21 sec",
  23839 => "23 sec",
  26223 => "26 sec",
  28845 => "28 sec",
  31730 => "31 sec",
  34903 => "34 sec",
  38393 => "38 sec",
  42232 => "42 sec",
  46455 => "46 sec",
  51101 => "51 sec",
  56211 => "56 sec",
  61832 => "1m1s",
  68015 => "1m8s",
  74817 => "1m14s",
  82299 => "1m22s",
  90529 => "1m30s",
  99582 => "1m39s",
  109540 => "1m49s",
  120494 => "2m0s",
  132543 => "2m12s",
  145797 => "2m25s",
  160377 => "2m40s",
  176415 => "2m56s",
  194057 => "3m14s",
  213463 => "3m33s",
  234809 => "3m54s",
  258290 => "4m18s",
  284119 => "4m44s",
  312531 => "5m12s",
  343784 => "5m43s",
  378162 => "6m18s",
  415978 => "6m55s",
  457576 => "7m37s",
  503334 => "8m23s",
  553667 => "9m13s",
  609034 => "10m9s",
  669937 => "11m9s",
  736931 => "12m16s",
  810624 => "13m30s",
  891686 => "14m51s",
  980855 => "16m20s",
  1078941 => "17m58s",
  1186835 => "19m46s",
  1305519 => "21m45s",
  1436071 => "23m56s",
  1579678 => "26m19s",
  1737646 => "28m57s",
  1911411 => "31m51s",
  2102552 => "35m2s",
  2312807 => "38m32s",
  2544088 => "42m24s",
  2798497 => "46m38s",
  3078347 => "51m18s",
  3386182 => "56m26s",
  3724800 => "1h2m",
  4097280 => "1h8m",
  4507008 => "1h15m",
  4957709 => "1h22m",
  5453480 => "1h30m",
  5998828 => "1h39m",
  6598711 => "1h49m",
  7258582 => "2h0m",
  7984440 => "2h13m",
  8782884 => "2h26m",
  9661172 => "2h41m",
  10627289 => "2h57m",
  11690018 => "3h14m",
  12859020 => "3h34m",
  14144922 => "3h55m",
  15559414 => "4h19m",
  17115355 => "4h45m",
  18826891 => "5h13m",
  20709580 => "5h45m",
  22780538 => "6h19m",
  25058592 => "6h57m",
  27564451 => "7h39m",
  30320896 => "8h25m",
  33352986 => "9h15m",
  36688285 => "10h11m",
  40357114 => "11h12m",
  44392825 => "12h19m",
  48832108 => "13h33m",
  53715319 => "14h55m",
  59086851 => "16h24m",
  64995536 => "18h3m",
  71495090 => "19h51m",
  78644599 => "21h50m",
  86509059 => "24h",
  95159965 => "26h",
  104675962 => "29h",
  115143558 => "32h",
  126657914 => "35h",
  139323705 => "39h",
  153256076 => "43h",
  168581684 => "47h",
  185439852 => "2 days",
  203983837 => "2 days",
  224382221 => "2 days",
  246820443 => "2 days",
  271502487 => "3 days",
  298652736 => "3 days",
  328518010 => "3 days",
  361369811 => "4 days",
  397506792 => "4 days",
  437257471 => "5 days",
  480983218 => "5 days",
  529081540 => "6 days",
  581989694 => "6 days",
  640188663 => "7 days",
  704207529 => "8 days",
  774628282 => "8 days",
  852091110 => "9 days",
  937300221 => "10 days",
  1031030243 => "11 days",
  1134133267 => "13 days",
  1247546594 => "14 days",
  1372301253 => "15 days",
  1509531378 => "17 days",
  1660484516 => "19 days",
  1826532968 => "21 days",
  2009186265 => "23 days",
  2210104892 => "25 days",
  2431115381 => "28 days",
  2674226919 => "30 days",
  2941649611 => "34 days",
  3235814572 => "37 days",
  3559396029 => "41 days",
  3915335632 => "45 days",
  4306869195 => "49 days",
  4737556115 => "54 days",
  5211311727 => "60 days",
  5732442900 => "66 days",
  6305687190 => "72 days",
  6936255909 => "80 days",
  7629881500 => "88 days",
  8392869650 => "97 days",
  9232156615 => "106 days",
  10155372277 => "117 days",
  11170909505 => "129 days",
  12288000456 => "142 days",
  13516800502 => "156 days",
  14868480552 => "172 days",
  16355328607 => "189 days",
  17990861468 => "208 days",
  19789947615 => "229 days",
  21768942377 => "251 days",
  23945836615 => "277 days",
  26340420277 => "304 days",
  28974462305 => "335 days",
  31871908536 => "368 days",
  35059099390 => "405 days",
  38565009329 => "446 days",
  42421510262 => "490 days",
  46663661288 => "540 days",
  51330027417 => "594 days",
  56463030159 => "653 days",
  62109333175 => "718 days",
  68320266493 => "790 days",
  75152293142 => "869 days",
  82667522456 => "956 days",
  90934274702 => "1052 days",
  100027702172 => "1157 days",
  110030472389 => "1273 days",
}
`)
})
