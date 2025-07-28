import { Client, Databases, Query } from "appwrite";
import config from "../config/config.js";

const client = new Client()
  .setEndpoint(config.appwriteURL)
  .setProject(config.appwriteProjectId);

const databases = new Databases(client);

// This creates a Post(doc) in Database.
export const createPost = async ({
  title,
  slug,
  content,
  featuredImage,
  status,
  userId
,
}) => {
  console.log({title,slug,content,featuredImage,status,userId})
  try {
    const createDoc = await databases.createDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      slug,
      {
        title,
        content,
        featuredImage,
        status,
        userId
,
      }
    );
    console.log("databaseConfig :: createPost :: response =", createDoc);
    return {
      // returning these things so this can be used to create a specifif response from the UI
      success: true,
      data: createDoc,
    };
  } catch (error) {
    console.error("appwrite :: databaseConfig :: createPost :: ", error);
    return {
      // returning these things so this can be used to create a specific response from the UI
      success: false,
      error: {
        message: error?.message || "Failed to create Post",
        code: error?.code || "CREATE POST FAILED",
      },
    };
  }
};

// This updates a Post(doc) in Database.
export const updatePost = async (
  slug,
  { title, content, featuredImage, status,  }
) => {
  try {
    const updateDoc = await databases.updateDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      slug,
      {
        title,
        content,
        featuredImage,
        status,
      }
    );
    console.log("appwrite :: databaseconfig :: updateDoc ", updateDoc);
    return {
      success: true,
      data: updateDoc,
    };
  } catch (error) {
    console.error("appwrite :: databaseconfig :: updateDoc ", error);
    return {
      success: false,
      error: {
        message: error?.message || "Failed to Update Post",
        code: error?.code || "UPDATE_POST_FAILED",
      },
    };
  }
};

// Deletes a post document from the database using its slug as the document ID.
export const deletePost = async (slug) => {
  try {
    const deletedPost = await databases.deleteDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      slug
    );

    console.log("Appwrte :: databaseConfig :: deletePost ", deletedPost);

    return {
      success: true,
      data: deletedPost,
    };
  } catch (error) {
    console.error("Appwrite :: databaseConfig :: deletePost", error);

    return {
      success: false,
      error: {
        message: error?.message || "Failed to delete Post",
        code: error?.code || "DELETE_POST_FAILED",
      },
    };
  }
};

// Getting a post from the database using its slug as the document ID.
export const getPost = async (slug) => {
  try {
    const post = await databases.getDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      slug
    );
    console.log("appwrite :: database :: getPost", post);
    return {
      success: true,
      data: post,
    };
  } catch (error) {
    console.error("appwrite :: database :: getPost", error);
    return {
      success: false,
      error: {
        message: error?.message || "Failed to Get Post",
        code: error?.code || "GETPOST_FAILED",
      },
    };
  }
};

// Getting all the posts, using query.currently only using status as query in future i'll expand it.
export const getPosts = async () => {
  let queries = [Query.equal("status", "active")];

  try {
    const posts = await databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      queries
    );

    console.log("appwrite :: database :: getPosts", posts);
    return {
      success: true,
      data: posts,
    };
  } catch (error) {
    console.error("appwrite :: database :: getPosts", error);

    return {
      success: false,
      error: {
        message: error?.message || "Failed to get Posts",
        code: error?.code || "GETPOSTS_FAILED",
      },
    };
  }
};

// Exporting a bundle of all the function so, it's easy to import them at once.
const databaseService = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
};

export default databaseService;
