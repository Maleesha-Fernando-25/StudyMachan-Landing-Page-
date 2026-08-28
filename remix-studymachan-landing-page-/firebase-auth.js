// Firebase Authentication Setup for StudyMachan
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAqV2iPXGTRRUNClCxNij9-_TNWZcB3rOM",
  authDomain: "studymachan-7.firebaseapp.com",
  projectId: "studymachan-7",
  storageBucket: "studymachan-7.firebasestorage.app",
  messagingSenderId: "998448351131",
  appId: "1:998448351131:web:08e60b126cc9707fda833e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

/**
 * Sign up a user with email and password, sends verification email,
 * and immediately signs out the user so they are not logged in automatically.
 */
export async function registerWithEmail(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Send verification email
    await sendEmailVerification(user);
    
    // Do not sign them in automatically
    await signOut(auth);
    
    return {
      success: true,
      email: user.email
    };
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return {
        success: false,
        error: "User already exists. Please sign in"
      };
    }
    if (error.code === 'auth/weak-password') {
      return {
        success: false,
        error: "Password is too weak. Please use at least 6 characters."
      };
    }
    if (error.code === 'auth/invalid-email') {
      return {
        success: false,
        error: "Please enter a valid email address."
      };
    }
    return {
      success: false,
      error: error.message || "Sign up failed. Please try again."
    };
  }
}

/**
 * Sign in a user with email and password.
 * Persists session using browserLocalPersistence if rememberMe is true, or browserSessionPersistence if false.
 * If email is not verified, blocks access, signs out, and flags verification requirement.
 */
export async function loginWithEmail(email, password, rememberMe = true) {
  try {
    const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
    await setPersistence(auth, persistenceType);

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Check if email is verified
    if (!user.emailVerified) {
      // Re-send verification email if desired, and sign out immediately
      try {
        await sendEmailVerification(user);
      } catch (e) {
        console.log("Verification email resend status:", e.message);
      }
      await signOut(auth);
      
      return {
        success: false,
        needsVerification: true,
        email: user.email
      };
    }
    
    return {
      success: true,
      user
    };
  } catch (error) {
    // Specific error message required: "Email or password is incorrect"
    if (
      error.code === 'auth/invalid-credential' ||
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/wrong-password' ||
      error.code === 'auth/invalid-email'
    ) {
      return {
        success: false,
        error: "Email or password is incorrect"
      };
    }
    if (error.code === 'auth/too-many-requests') {
      return {
        success: false,
        error: "Too many failed attempts. Please try again later."
      };
    }
    return {
      success: false,
      error: "Email or password is incorrect"
    };
  }
}

/**
 * Sign in with Google Popup
 */
export async function loginWithGoogle(rememberMe = true) {
  try {
    const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
    await setPersistence(auth, persistenceType);

    const result = await signInWithPopup(auth, googleProvider);
    return {
      success: true,
      user: result.user
    };
  } catch (error) {
    console.error("Google login error:", error);

    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      return { success: false, error: null };
    }
    if (error.code === 'auth/popup-blocked') {
      // Fall back to a full-page redirect when popups are unavailable.
      await signInWithRedirect(auth, googleProvider);
      return { success: false, error: null, redirecting: true };
    }
    if (error.code === 'auth/unauthorized-domain') {
      const hostname = window.location.hostname || "this domain";
      return {
        success: false,
        error: `Domain not authorized (${hostname}). In Firebase Console, go to Authentication > Settings > Authorized domains and add "${hostname}".`
      };
    }
    if (error.code === 'auth/operation-not-allowed') {
      return {
        success: false,
        error: "Google Sign-In is disabled in Firebase. Enable Google in Firebase Console > Authentication > Sign-in method."
      };
    }
    if (error.code === 'auth/account-exists-with-different-credential') {
      return {
        success: false,
        error: "An account already exists with this email using a password. Please sign in with your email and password."
      };
    }
    if (error.code === 'auth/network-request-failed') {
      return {
        success: false,
        error: "Network error during Google sign-in. Please check your connection and try again."
      };
    }
    return {
      success: false,
      error: error.message || "Google sign-in failed. Please try again."
    };
  }
}

/**
 * Resend verification email
 */
export async function resendVerificationEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user);
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Send password reset email using Firebase Authentication
 */
export async function sendPasswordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      email
    };
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      return {
        success: false,
        error: "No account found with this email address."
      };
    }
    if (error.code === 'auth/invalid-email') {
      return {
        success: false,
        error: "Please enter a valid email address."
      };
    }
    return {
      success: false,
      error: error.message || "Failed to send password reset email. Please try again."
    };
  }
}

/**
 * Log out user
 */
export async function logout() {
  try {
    await signOut(auth);
    window.location.href = "signup.html";
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
