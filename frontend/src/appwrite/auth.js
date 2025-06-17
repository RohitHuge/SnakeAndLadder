import { Client, Account, ID } from "appwrite";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from '../config.js';
import api from '../axious.js';
import { initializeSocket } from '../utils/socket.js';


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(APPWRITE_PROJECT_ID);
        this.account = new Account(this.client);
          
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another 
                const res = await this.login({email, password});
                return res;
                
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password, setUser, setSocket}) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            if (!session) {
                throw new Error('Invalid email or password');
            }

            const jwt = await this.account.createJWT();
            api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            const currentUser = await this.account.get();

            setUser({
                id: currentUser.$id,
                name: currentUser.name,
                email: currentUser.email,
                role: currentUser.role,
                token: jwt,
                // avatar: account.prefs.avatar,
            });

            const socket = initializeSocket();
            setSocket(socket);


            return currentUser;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // Check if the error is due to no user being logged in
            if (error.code === 401 || error.type === 'user_unauthorized') {
                return null;
            }
            console.log("Appwrite service :: getCurrentUser :: error", error);
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

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService



