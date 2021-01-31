import config from './config';
import firebase from 'firebase';

const db = firebase.initializeApp(config.firebaseConfig);
export default module.exports = db;
