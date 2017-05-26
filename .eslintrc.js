module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  rules: {
    'no-use-before-define': ['error', 'nofunc'],
    'no-mixed-operators': 0,
    'arrow-parens': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-await-in-loop': 0,
  },
};
