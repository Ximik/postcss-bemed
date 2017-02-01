# postcss-bemed

[![Build Status](https://travis-ci.org/Ximik/postcss-bemed.svg?branch=master)](https://travis-ci.org/Ximik/postcss-bemed)

[PostCSS](https://github.com/postcss/postcss) plugin for [BEM](https://en.bem.info/) class names generation. Useful for creation of
isolated class names without [css-modules](https://github.com/css-modules/css-modules) (e.g. if you have user themes support). Great for [React](https://github.com/facebook/react) applications in combination with [babel plugin](https://github.com/Ximik/babel-plugin-transform-jsx-bemed).
Can be used with [postcss-autoreset](https://github.com/maximkoretskiy/postcss-autoreset) without extra configuration.

## Usage
Just require it as any other postcss plugin and use special AtRules.

```js
postcss([ require('postcss-bemed')])
```

**Input**
```css
@block MyBlock {
  font-size: 20px;
  @modifier fullsized {
    width: 100%;
    height: 100%;
  }
  @element text {
    @modifier result {
      @value ok {
        color: green;
      }
      @value error {
        color: red;
      }
    }
    @modifier size {
      box-sizing: border-box;
      @value full {
        width: 100%;
      }
      @value half {
        width: 50%;
      }
    }
  }
}
```

**Output**
```
.MyBlock {
  font-size: 20px
}
.MyBlock--fullsized {
  width: 100%;
  height: 100%
}
.MyBlock__text {}
.MyBlock__text--result {}
.MyBlock__text--result-ok {
  color: green
}
.MyBlock__text--result-error {
  color: red
}
.MyBlock__text--size {
  box-sizing: border-box
}
.MyBlock__text--size-full {
  width: 100%
}
.MyBlock__text--size-half {
  width: 50%
}

```

## Options

### rules

Set custom rule naming. Default is
```js
rules: {
  block: 'block',
  element: 'element',
  modifier: 'modifier',
  value: 'value'
}
```

### separators

Set custom bem separators. Default is
```js
separators: {
  element: '__',
  modifier: '--',
  value: '-'
}
```
