yo react-webpack

yo react-webpack:component login/Login

yo react-webpack:component my/namespaced/components/name --stateless



{
  "parser": "babel-eslint",
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "amd": true,
    "es6": true,
    "node": true,
    "mocha": true
  },
  "rules": {
    "comma-dangle": 0,
    "quotes": [ 0, "single" ],
    "no-undef": 0,
    "global-strict": 0,
    "no-extra-semi": 0,
    "no-underscore-dangle": 0,
    "no-console": 0,
    "no-unused-vars": 1,
    "no-trailing-spaces": [0, { "skipBlankLines": true }],
    "no-unreachable": 0,
    "no-alert": 0,
    "react/jsx-uses-react": 0,
    "react/jsx-uses-vars": 0
  }
}