import { initializeApp } from "@firebase/app";
import { getAuth, GoogleAuthProvider } from "@firebase/auth";
import { getStorage } from "@firebase/storage";
import { firebaseConfig } from "./firebaseConfig";

const Firebase = initializeApp(firebaseConfig);
const storage = getStorage(Firebase);
const auth = getAuth();
const Providers = { google: new GoogleAuthProvider() };

export { Firebase, storage, auth, Providers };
