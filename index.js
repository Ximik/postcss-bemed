"use strict"

const postcss = require('postcss'),
      bemed = require('bemed');

const pluginName = 'postcss-bemed';
module.exports = postcss.plugin(pluginName, (opts) => {
  opts = opts || {};
  const rules = Object.assign({
    block: 'block',
    element: 'element',
    modifier: 'modifier',
    value: 'value'
  }, opts.rules || {});
  const helpers = bemed({ separators: opts.separators || {} }).helpers;

  const getParam = (path) => {
    if (!path.params) {
      throw path.error('Missing param', { plugin: pluginName });
    }
    const params = postcss.list.space(path.params);
    if (params.length !== 1) {
      throw path.error('Must have only one param', { plugin: pluginName });
    }
    return params[0];
  };

  const clone = (path, className) => {
    return postcss.rule({
      selector: '.' + className,
      source: path.source
    });
  };

  const processIfModifier = (root, path, be) => {
    if (path.type === 'atrule' && path.name === rules.modifier) {
      const m = getParam(path);
      const modifier = clone(path, helpers.bem(be, m));
      path.each((path) => {
        if (path.type === 'atrule' && path.name === rules.value) {
          const v = getParam(path);
          const value = clone(path, helpers.bemv(be, m, v));
          path.each((path) => path.moveTo(value));
          value.moveTo(root);
          return;
        }
        path.moveTo(modifier);
      });
      modifier.moveTo(root);
      return true;
    }
    return false;
  }

  return (root) => {
    root.walkAtRules(rules.block, (path) => {
      const b = getParam(path);
      const root = path.parent;
      const block = clone(path, b);
      path.each((path) => {
        if (processIfModifier(root, path, b)) return;
        if (path.type === 'atrule' && path.name === rules.element) {
          const e = getParam(path);
          const be = helpers.be(b, e);
          const element = clone(path, be);
          path.each((path) => {
            if (processIfModifier(root, path, be)) return;
            path.moveTo(element);
          });
          element.moveTo(root);
          return;
        }
        path.moveTo(block);
      });
      path.replaceWith(block);
    });
  };
});
