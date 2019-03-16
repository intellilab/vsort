module.exports = {
  extends: require.resolve('@gera2ld/plaid/config/babelrc'),
  presets: [
    // react
    ['@babel/preset-react', {
      pragma: 'h',
    }],
  ],
  plugins: [
  ]
};
