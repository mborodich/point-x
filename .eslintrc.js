
module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  "rules": {
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    'react/jsx-props-no-spreading': ['off'],
    'max-len': ["error", { "code": 200 }]
  }
};
