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
  apiKey: "hidden",
  authDomain: "hidden",
  projectId: "hidden",
  storageBucket: "hidden",
  messagingSenderId: "hidden",
  appId: "hidden",
  measurementId: "hidden"
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
