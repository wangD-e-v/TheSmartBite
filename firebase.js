import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  sendEmailVerification, 
  initializeAuth, 
  getReactNativePersistence 
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCABfwE17zXBBDvziIXYtgObkLoVjOJiOY",
  authDomain: "smartbiteapp-c8629.firebaseapp.com",
  projectId: "smartbiteapp-c8629",
  storageBucket: "smartbiteapp-c8629.appspot.com",
  messagingSenderId: "193786473701",
  appId: "1:193786473701:web:1d517ed83b20733b77b80c",
  measurementId: "G-XRJGP0JX7X"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

// Send Verification Email
export const sendVerificationEmail = async (user) => {
  try {
    await sendEmailVerification(user);
    console.log("Verification email sent!");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

// User Signup Function
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send email verification
    await sendVerificationEmail(user);

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: email,
      createdAt: new Date(),
    });

    return userCredential;
  } catch (error) {
    throw error;
  }
};

// User Login Function
export const login = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

// Reset Password Function
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

export { auth, db };
