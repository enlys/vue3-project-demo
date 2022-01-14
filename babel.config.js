module.exports = {
  presets: [
    '@babel/preset-env',
  ],
  plugins: [
    [
      'import',
      { libraryName: 'vant', libraryDirectory: 'es', style: true },
      'vant',
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ],
};
