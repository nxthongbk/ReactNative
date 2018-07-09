import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyARkGibHMnWqtZfphY2B2aEnLA9wNi7uA0",
  authDomain: "bus-system-1530695467769.firebaseapp.com",
  databaseURL: "https://bus-system-1530695467769.firebaseio.com",
  projectId: "bus-system-1530695467769",
  storageBucket: "bus-system-1530695467769.appspot.com",
  messagingSenderId: "775590470785"
};
export const firebaseApp= firebase.initializeApp(config);