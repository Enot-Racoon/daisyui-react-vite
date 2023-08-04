'use strict'

const path = require('path')
const swcJest = require('@swc/jest')
const camelcase = require('camelcase')

// Wrap '@swc/jest' whit React auto import
// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/en/webpack.html
module.exports = {
  createTransformer: config => {
    const transformer = swcJest.createTransformer(config)

    return Object.assign({
      canInstrument: transformer.canInstrument,
      getCacheKey: transformer.getCacheKey,
      processAsync: (filetext, filename, options) => {
        const assetFilename = JSON.stringify(path.basename(filename))
        if (filename.match(/\.[jt]sx$/) && !filetext.match(/React\s+from\s+/)) {
          return transformer.processAsync(
            `import React from 'react'
            ${filetext}`,
            filename,
            options
          )
        }
        return transformer.processAsync(filetext, filename, options)
      },
      process: (filetext, filename, options) => {
        const assetFilename = JSON.stringify(path.basename(filename))
        if (filename.match(/\.[jt]sx$/) && !filetext.match(/React\s+from\s+/)) {
          return transformer.process(
            `import React from 'react'
            ${filetext}`,
            filename,
            options
          )
        }
        return transformer.process(filetext, filename, options)
      },
    })
  },
}
