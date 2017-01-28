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
.block__element--mod-val {
    param: val
}
.block__element--mod {}
.block__element {}
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
.block---element--mod-val {
    param: val
}
.block---element--mod {}
.block---element {}
`, {
  separators: {
    element: '---'
  }
});
