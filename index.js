const postcss = require('postcss');

const pluginName = 'postcss-bemed';
module.exports = postcss.plugin(pluginName, (opts) => {
  const getParams = (path, num) => {
    if (!path.params) {
      throw path.error('Missing param(s)', { plugin: pluginName });
    }
    params = postcss.list.space(path.params);
    if (params.length !== num) {
      throw path.error('Must have ' + num + ' param(s) max', { plugin: pluginName });
    }
    return params;
  };

  const process = (path, opts) => {
    console.log(opts);
  };

  return function (root) {
    root.walkAtRules('block', (bpath) => {
      const block = getParams(bpath, 1)[0];
      bpath.walkAtRules('element', (epath) => {
        const element = getParams(epath, 1)[0];
        postcss.rule({
          selector: '.' + block + '__' + element,
          nodes: epath.nodes
        }).moveAfter(bpath);
        epath.remove();
      });
      bpath.replaceWith(postcss.rule({
        selector: '.' + block,
        nodes: bpath.nodes
      }));
    });
    root.walkAtRules('element', (path) => {
      const params = getParams(path, 2);
      path.replaceWith(postcss.rule({
        selector: '.' + params[0] + '__' + params[1],
        nodes: path.nodes
      }));
    });
    root.walkAtRules('modifier', (mpath) => {
    });
  };
});
