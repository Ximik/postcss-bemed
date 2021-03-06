"use strict"

const assert = require('./common');

assert('base structure', `
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
.block__element {
    param: element
}
.block__element--mod {
    param: mod
}
.block__element--mod-val {
    param: val
}
`);

assert('real life example', `
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
.Message--size {
    box-sizing: border-box
}
.Message--size-big {
    width: 500px
}
.Message--size-small {
    width: 200px
}
.Message__title {
    font-size: 20px
}
.Message__message {
    font-size: 16px;
    color: black
}
.Message__message--state {}
.Message__message--state-error {
    color: red
}
.Message__message--state-success {
    color: green
}
`);
