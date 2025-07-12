import config from "../config/config";
import { Client, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint(config.appwriteURL)
  .setProject(config.appwriteProjectId);


  const account = new Account(client);

  const user = await account.create(
    ID.unique(),
    "blue009@gmail.com",
    "password"
  )