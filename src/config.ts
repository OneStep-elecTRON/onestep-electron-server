const dotenv = require('dotenv');

dotenv.config();

const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } = process.env;

export default module.exports = {
  firebaseConfig: {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  },
};
