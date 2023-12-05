const { createRequestHandler } = require('@expo/server/adapter/vercel');

// NOTE: Installing `@vercel/node` is required
module.exports = createRequestHandler({
  /* @info Points to the root `dist/` (output) folder */
  build: require('path').join(__dirname, '../dist/server'),
  /* @end */
  mode: process.env.NODE_ENV,
});
