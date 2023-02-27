const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

function getPath (url) {
  return resolve(__dirname, url)
}

function readFile (url) {
  const data = readFileSync(getPath(url), { encoding: 'utf8' })
  return JSON.parse(data)
}

function writeFile (url, data) {
  writeFileSync(getPath(url), JSON.stringify(data), { encoding: 'utf8' })
}

function handleFileOperation (url, cb, type) {
  let data = readFile(url)
  if (cb) {
    data = cb(data)
    if (type === 'write') writeFile(url, data)
  }
  return data
}

module.exports = {
  handleFileOperation
}
