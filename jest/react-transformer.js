/* eslint-disable @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/restrict-template-expressions */
const swcJest = require('@swc/jest')

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
