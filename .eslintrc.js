
module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  "rules": {
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    'react/jsx-props-no-spreading': ['off'],
    'lines-between-class-members': ['off'],
    'prefer-promise-reject-errors': ['off'],
    'no-underscore-dangle': ['off'],
    'max-len': ["error", { "code": 200 }]
  }
};
