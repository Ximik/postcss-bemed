"use strict"

const tap = require('tap'),
      postcss = require('postcss'),
      plugin = require('../');

if (require.main === module) {
  tap.pass('common test file');
  return;
}

module.exports = (test, source, result, opts) => {
  tap.test(test, (t) => {
    postcss([ plugin(opts) ]).process(source)
    .then((res) => {
      t.equal(res.css.trim(), result.trim());
      t.end();
    })
    .catch((e) => {
      t.fail(e);
    });
  });
};
