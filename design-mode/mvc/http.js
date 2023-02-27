import { BASE_URL } from './config.js'

function httpGet (url) {
  return new Promise(async resolve => {
    const res = await fetch(BASE_URL + url).then(res => res.json())
    resolve(res)
  })
}

function httpPost (url, params) {
  return new Promise(async resolve => {
    const res = await fetch(BASE_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then(res => res.json())
    resolve(res)
  })
}

export {
  httpGet,
  httpPost
}
