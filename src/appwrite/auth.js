  import config from "../config/config";
  import { Client, Account, ID } from "appwrite";

  const client = new Client()
    .setEndpoint(config.appwriteURL)
    .setProject(config.appwriteProjectId);

  const account = new Account(client);

  // to create user
  export const createUser = async (email, password) => {
    try {
      return await account.create(ID.unique(), email, password);
    } catch (error) {
      console.error("Create User:-", error);
     return null; // Safeguard: return null instead of undefined if an error occurs
    }
  };

  // to login existing users
  export const loginUser = async (email, password) => {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Login User:-", error);
     return null; // Safeguard: return null instead of undefined if an error occurs
    }
  };

  // to know if user is log in or not
  export const getUser = async () => {
    try {
      return await account.get();
    } catch (error) {
      console.error("Get User:", error);
           return null; // Safeguard: return null instead of undefined if an error occurs

    }
  };

  // to log out the user
  export const logOutUser = async () => {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      console.error("log Out User:", error);
     return null; // Safeguard: return null instead of undefined if an error occurs
    }
  };
