import config from "../config/config";
import { Client, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint(config.appwriteURL)
  .setProject(config.appwriteProjectId);

const account = new Account(client);

// to create user
export const createUser = async ({email, password, name}) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Create User:-", error);
    return {
      success: false,
      error: {
        message: error?.message || "Failed to create User",
      },
    }; // Safeguard: return for better UI response
  }
};

// to login existing users
export const loginUser = async ({email, password}) => {
  try {
    const user = await account.createEmailPasswordSession(email, password);
    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Login User:-", error);
    return {
      success: false,
      error: {
        message: error?.message || "Failed to login User",
      },
    };
  }
};

// to know if user is loged in or not
export const getUser = async () => {
  try {
    const user = await account.get();
    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Get User:", error);
    return {
      success: false,
      error: {
        message: error?.message || "Failed to get User",
      },
    };
  }
};

// to log out the user
export const logOutUser = async () => {
  try {
    const user = await account.deleteSession("current");
    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("log Out User:", error);
    return {
      success: false,
      error: {
        message: error?.message || "Failed to logout User",
      },
    };
  }
};

// Exporting all the function at once so, i don't have to import each functions one by one, i can just import "authServices" and access all the function inside.
const authServices = {
  createUser,
  loginUser,
  getUser,
  logOutUser,
};

export default authServices;
