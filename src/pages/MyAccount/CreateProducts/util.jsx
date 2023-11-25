import {
  auth,
  doc,
  firestore,
  getDownloadURL,
  ref,
  setDoc,
  storage,
  uploadBytes,
  deleteObject,
} from "config/firebase";
import { storeDataInFirestore, updateDataInFirestore } from "pages/util";

export async function createProduct(specification) {
  const email = auth.currentUser.email;
  const productId = specification.productId || getUniqueId();
  const listOfFilePaths = await uploadFiles(specification, email, productId);
  const productsCollection = `products/${productId}`;

  if (specification.productId) {
    specification = {
      ...specification,
      files: listOfFilePaths,
    };
    delete specification.originalFiles;
    await updateDataInFirestore(productsCollection, specification);
  } else {
    specification = {
      ...specification,
      files: listOfFilePaths,
      productId,
      createdProductTimestamp: new Date().getTime(),
      productStatus: "Not published",
      creatorOfProduct: email,
    };
    const myAccountCollection = `myAccount/${email}/products/${productId}`;
    Promise.all([
      storeDataInFirestore(myAccountCollection, { productId }),
      storeDataInFirestore(productsCollection, specification),
    ]);
  }
}

async function uploadFiles(specification, email, productId) {
  //if we're editing a product, we delete all images associated with that product from cloud storage
  //and upload new one
  if (specification.originalFiles) {
    for (var i = 0; i < specification.originalFiles.length; i++) {
      if (!specification.files.includes(specification.originalFiles[i])) {
        const fileId = extractFileIdFromPath(specification.originalFiles[i]);
        await deleteFromStorage(`products/${email}/${productId}/${fileId}`);
      }
    }
  }

  return await Promise.all(
    specification.files.map(async (file) => {
      const fileId = getUniqueId();
      const pathToFile = `${email}/${productId}/${fileId}`;
      if (typeof file === "string") return file;
      //upload the new file
      await uploadFile(file, pathToFile);
      const url = await getUploadedFileUrl(pathToFile, "products");
      return url;
    })
  );
}

function extractFileIdFromPath(filePath) {
  const parts = filePath.split("2F");
  const index = parts[3].indexOf("?");
  const fileId = parts[3].substring(0, index);
  return fileId;
}

async function deleteFromStorage(path) {
  await deleteObject(ref(storage, path));
}

async function uploadFile(file, pathToFile) {
  const storageRef = ref(storage, `/products/${pathToFile}`);
  await uploadBytes(storageRef, file);
}

async function getUploadedFileUrl(path) {
  return await getDownloadURL(ref(storage, `products/${path}`));
}

function getUniqueId() {
  return (
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36)
  );
}
