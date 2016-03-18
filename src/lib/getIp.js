// import dns from 'dns'
// import os from 'os'
//
// export default function getIp () {
//   return dns.lookup(os.hostname(), function (err, add, fam) {
//     if (err) return ''
//     return add
//   })
// }

import os from 'os'
import { pathOr } from 'ramda'

export default function getIp () {
  const ifaces = os.networkInterfaces()
  const ip = pathOr(null, ['en0', 'address'])(ifaces) || pathOr(null, ['eth0', 'address'])(ifaces) || '127.0.0.1'

  return ip
}
