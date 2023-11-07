import {
  auth,
  provider,
  signInWithPopup,
  signOut,
  doc,
  getDoc,
  firestore,
  setDoc,
} from "config/firebase";

export async function getProductById(productId) {
  const docRef = doc(firestore, "products", productId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No Document found");
  }
}

export async function getUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
}

export async function storeDataInFirestore(path, data) {
  await setDoc(doc(firestore, path), data);
}

export async function signInWithGoogle() {
  const user = await signInWithPopup(auth, provider);
  return user;
}

export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    alert("An error occured");
  }
}