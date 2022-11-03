import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBww93W06hKCYnyqH1d7NeqOAlIiV2fEDk",
    authDomain: "login-47d21.firebaseapp.com",
    projectId: "login-47d21",
    storageBucket: "login-47d21.appspot.com",
    messagingSenderId: "111429713826",
    appId: "1:111429713826:web:4eb8ee707691446a497cfb",
    measurementId: "G-LHT5XPWMSC"
};
// const firebaseConfig = {
//     apiKey: "AIzaSyAe_AfgOJSLG157ZgEzeFIXgdOSis6SsTE",
//     authDomain: "login-3abdc.firebaseapp.com",
//     projectId: "login-3abdc",
//     storageBucket: "login-3abdc.appspot.com",
//     messagingSenderId: "975101696557",
//     appId: "1:975101696557:web:10c750f6ee4a4d915276a4",
//     measurementId: "G-CNKC0BL81D"
// };
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    console.log(res)
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async ( email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res)
    localStorage.setItem("user", JSON.stringify(res.user.accessToken));
    localStorage.setItem("name", JSON.stringify(res.user.displayName));
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
// import { initializeApp } from "firebase/app";
// import {
//     GoogleAuthProvider,
//     getAuth,
//     signInWithPopup,
//     signInWithEmailAndPassword,
//     createUserWithEmailAndPassword,
//     sendPasswordResetEmail,
//     signOut,
// } from "firebase/auth";
// import {
//     getFirestore,
//     query,
//     getDocs,
//     collection,
//     where,
//     addDoc,
// } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyBww93W06hKCYnyqH1d7NeqOAlIiV2fEDk",
//     authDomain: "login-47d21.firebaseapp.com",
//     projectId: "login-47d21",
//     storageBucket: "login-47d21.appspot.com",
//     messagingSenderId: "111429713826",
//     appId: "1:111429713826:web:4eb8ee707691446a497cfb",
//     measurementId: "G-LHT5XPWMSC"
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// const googleProvider = new GoogleAuthProvider();
// const signInWithGoogle = async () => {
//   try {
//     const res = await signInWithPopup(auth, googleProvider);
//     const user = res.user;
//     const q = query(collection(db, "users"), where("uid", "==", user.uid));
//     const docs = await getDocs(q);
//     if (docs.docs.length === 0) {
//       await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// const logInWithEmailAndPassword = async (email, password) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };

//   const registerWithEmailAndPassword = async (name, email, password) => {
//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);
//       const user = res.user;
//       await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         name,
//         authProvider: "local",
//         email,
//       });
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };

//   const sendPasswordReset = async (email) => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       alert("Password reset link sent!");
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };

//   const logout = () => {
//     signOut(auth);
//   };

//   export {
//     auth,
//     db,
//     signInWithGoogle,
//     logInWithEmailAndPassword,
//     registerWithEmailAndPassword,
//     sendPasswordReset,
//     logout,
//   };