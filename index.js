"use strict"

const postcss = require('postcss');

const pluginName = 'postcss-bemed';
module.exports = postcss.plugin(pluginName, (opts) => {
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

  const processIfModifier = (root, path, be) => {
    if (path.type === 'atrule' && path.name === 'modifier') {
      const m = getParam(path);
      const modifier = postcss.rule({
        selector: '.' + be + '--' + m,
        source: path.source
      });
      path.each((path) => {
        if (path.type === 'atrule' && path.name === 'value') {
          const v = getParam(path);
          const value = postcss.rule({
            selector: '.' + be + '--' + m + '-' + v,
            source: path.source
          });
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
    root.walkAtRules('block', (path) => {
      const b = getParam(path);
      const root = path.parent;
      const block = postcss.rule({
        selector: '.' + b,
        source: path.source
      });
      path.each((path) => {
        if (processIfModifier(root, path, b)) return;
        if (path.type === 'atrule' && path.name === 'element') {
          const e = getParam(path);
          const be = b + '__' + e;
          const element = postcss.rule({
            selector: '.' + be,
            source: path.source
          });
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
