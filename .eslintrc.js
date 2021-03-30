module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react-native/no-inline-styles': 'off',
  },
  globals: {
    IntersectionObserver: true,
    localStorage: true,
    Buffer: true,
    redis: true,
    mongoose: true,
    pubsub: true,
  },
};
