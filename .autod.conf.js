module.exports = {
  write: true,
  prefix: '~',
  devprefix: '^',
  exclude: [
    'common',
    'components',
    'pages',
    'views'
  ],
  dep: [],
  devdep: [
    'babel-core',
    'babel-plugin-transform-async-to-generator',
    'babel-plugin-transform-decorators-legacy',
    'babel-plugin-transform-es2015-arrow-functions',
    'babel-plugin-transform-es2015-for-of',
    'babel-plugin-transform-es2015-modules-commonjs',
    'babel-plugin-transform-es2015-parameters',
    'babel-plugin-transform-es2015-spread',
    'babel-preset-es2015',
    'babel-preset-stage-1',
    'eslint',
    'eslint-config-airbnb',
    'eslint-plugin-import'
  ],
  keep: [
  ],
  semver: [
  ]
};
