import config from "../config/config.js";
import { Client, ID, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(config.appwriteURL)
  .setProject(config.appwriteProjectId);

const storage = new Storage(client);

// This function upload's the file(img etc.) and returns the URL.
export const uploadFile = async (file) => {
  try {
    const uploadedFile = await storage.createFile(
      config.appwriteBucketId,
      ID.unique(),
      file
    );
    console.log("appwrite :: storage :: uploadfile", uploadedFile);
    return {
      success: true,
      data: uploadedFile,
    };
  } catch (error) {
    console.error("appwrite :: storage :: uploadFile", error);

    return {
      success: false,
      error: {
        message: error?.message || "failed to upload file",
        code: error?.code || "UPLOADFILE FAILED",
      },
    };
  }
};

// This function deletes the file whose ID is passed.
export const deleteFile = async (fileId) => {
  try {
    const deletedFile = await storage.deleteFile(
      config.appwriteBucketId,
      fileId
    );

    console.log("appwrite :: storage :: deledeFile", deletedFile);
    return {
      success: true,
      data: deletedFile,
    };
  } catch (error) {
    console.error("appwrite :: storage :: deleteFile", error);

    return {
      success: false,
      error: {
        message: error?.message || "Failed to delteFile",
        code: code?.code || "DELETEFILE_FAILED",
      },
    };
  }
};

// This function gets the file for preview
export const getFilePreview = async (fileId) => {
  try {
    const file =  storage.getFilePreview(config.appwriteBucketId, fileId);
    console.log("appwrite :: storage :: getFilePreview", file);
    return {
      success: true,
      data: file,
    };
  } catch (error) {
    console.log("appwrite :: storage :: getFilePreview", error);
    return {
      success: false,
      error: {
        message: error?.message || "Failed to get the preview of the file",
        code: error?.code || "GETFILEPREVIEW_FAILED",
      },
    };
  }
};

// Exporting all the function at once in an obj, so it's easy to access the function with one main import of the obj.
const storageServices = {
  uploadFile,
  deleteFile,
  getFilePreview,
};

export default storageServices;
