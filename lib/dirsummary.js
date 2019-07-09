'use strict'

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

/**
 * A synchronous file processor
 * @param  {string} filepath Filepath to readFileSync
 * @return {Object}          Extracted data from the file
 */
exports.processFile = function (filepath) {
  let content = fs.readFileSync(filepath, 'utf8')
  let lines = content.split('\n')
    .filter(line => Boolean(line.trim()))

  let title = lines[0].replace(/^[^a-z0-9]+/i, '').trim()
  let description = lines[1].trim().replace(/^[^a-z0-9]+/i, '')
  let dirname = path.basename(path.dirname(filepath))
  let volume = path.basename(path.dirname(path.dirname(filepath)))
  let filename = path.basename(filepath)
  let name = path.basename(filepath, path.extname(filepath))
  let datas = { volume, dirname, filename, name, title, description }

  let rest = lines.slice(2).join('\n')
  let meta = /```\s?yaml((?:\n|.)*?)```/.exec(rest)

  if (meta) {
    try {
      meta = yaml.load(meta[1].trim())
      datas = Object.assign({}, meta, datas)
    } catch (e) {
      console.error('Warning: Unable to read yaml meta on %s (%s)', filepath, e.message)
    }
  }
  return datas
}
