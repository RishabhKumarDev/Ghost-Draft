export default {
  appwriteURL: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

//  this file holds all the env key that hold the values(data,Api's,id's)
// so instead of writing all that import.meta.env.theLinks i can directly use the key that hold that value to access it rather than hardcoding it in the code base,
// so in future if i have to change any of the values i can directly change it here and change will be visible in the code base, not needing to find and change the hardcoded part.
//  reasons so all the keys can directly be used to access the data without needing to write those many words every where:>
