"use strict"

const test = require('./common');

test('rules option', `
@block block {
  @elem element {
    @mod mod {
      @val val {
        param: val;
      }
    }
  }
}
`, `
.block {}
.block__element {}
.block__element--mod {}
.block__element--mod-val {
    param: val
}
`, {
  rules: {
    element: 'elem',
    modifier: 'mod',
    value: 'val'
  }
});

test('separators option', `
@block block {
  @element element {
    @modifier mod {
      @value val {
        param: val;
      }
    }
  }
}
`, `
.block {}
.block---element {}
.block---element--mod {}
.block---element--mod-val {
    param: val
}
`, {
  separators: {
    element: '---'
  }
});
