const nativewind = require('nativewind/babel');

module.exports = function (api) {
  api.cache(true);
  const { plugins } = nativewind();
  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
