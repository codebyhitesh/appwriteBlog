import { conf } from '../../conf/conf';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
                return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

 async login({email,password}){
    try {
        return await this.account.createEmailPasswordSession(email,password);
    } catch (error) {
        throw error;
    }
 }

    async getCurrentUser() {
        try {
            const account = await this.account.get();
            if(!account){
                return null
            }else{
                return account
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("User is not authenticated or the session has expired. Please log in again.");
            } else {
                console.log("An error occurred while fetching the current user:", error);
            }
            return null;
        }
    }
    

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService; // Removed comma here
