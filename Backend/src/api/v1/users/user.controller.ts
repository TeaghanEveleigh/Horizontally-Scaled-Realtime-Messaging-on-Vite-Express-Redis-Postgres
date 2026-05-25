import { query } from "#config/db.js";

export interface user {
    id:string
    email:string
    username:string
    created_at : Date
}

export const UserModel = {

}