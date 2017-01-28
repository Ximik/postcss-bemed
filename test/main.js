"use strict"

const test = require('./common');

test('base structure', `
@block block {
  param: block;
  @element element {
    param: element;
    @modifier mod {
      param: mod;
      @value val {
        param: val;
      }
    }
  }
}
`, `
.block {
    param: block
}
.block__element--mod-val {
    param: val
}
.block__element--mod {
    param: mod
}
.block__element {
    param: element
}
`);

test('real life example', `
@block Message {
  padding: 20px;
  @modifier size {
    box-sizing: border-box;

    @value big {
      width: 500px;
    }
    @value small {
      width: 200px;
    }
  }
  @element title {
    font-size: 20px;
  }
  @element message {
    font-size: 16px;
    color: black;
    @modifier state {
      @value error {
        color: red;
      }
      @value success {
        color: green;
      }
    }
  }
}
`, `
.Message {
    padding: 20px
}
.Message--size-big {
    width: 500px
}
.Message--size-small {
    width: 200px
}
.Message--size {
    box-sizing: border-box
}
.Message__title {
    font-size: 20px
}
.Message__message--state-error {
    color: red
}
.Message__message--state-success {
    color: green
}
.Message__message--state {}
.Message__message {
    font-size: 16px;
    color: black
}
`);
