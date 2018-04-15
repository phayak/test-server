if (process.env.NODE_ENV === 'test') {
  module.exports = {
    JWT_SECRET: 'secertkeynaqdaxserver',
    oauth: {
      google: {
        clientID: 'number',
        clientSecret: 'string',
      },
      facebook: {
        clientID: 'number',
        clientSecret: 'string',
      },
    },
  };
} else {
  module.exports = {
    JWT_SECRET: 'secertkeynaqdaxserver',
    oauth: {
      google: {
        clientID: '312494797221-q80t42kln2qo9erpefvu6ofjqjvaki45.apps.googleusercontent.com',
        clientSecret: 'qNK2hM3DuPNdQFqBozvwvBpD',
      },
      facebook: {
        clientID: '143973939047072',
        clientSecret: '32c2a5b48e91ef81eda71b41b4d618a3',
      },
    },
  };
}
