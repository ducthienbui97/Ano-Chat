import config from './FirebaseConfig.jsx';
import * as firebase from 'firebase';
firebase.initializeApp(config);
const db = firebase.database();
const ref = db.ref("/last_user");
const FireBase = {
  getLastUser : () => {
    return new Promise(
        (resolve,reject) => {
          ref.once('value',(snapshot) =>{
            resolve(snapshot.val().value);
          });
        }
    );
  },
  setLastUser : (id) =>{
    ref.set({
      "value" : id
    });
  } 
}
export default FireBase;