var Config = {};

if (process.env.NODE_ENV === 'production') {
  Config.firebaseUrl = 'https://watch-levelup-red.firebaseIO.com';
} else {
  Config.firebaseUrl = 'https://watch-edition-red.firebaseIO.com';
}

module.exports = Config;
