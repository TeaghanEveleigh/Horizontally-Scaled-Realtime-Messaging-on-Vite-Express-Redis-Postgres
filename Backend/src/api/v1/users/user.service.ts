
import bcrypt from 'bcrypt';

import { AppError } from "#api/types.js";

import { UserModel } from "./user.model.js";
import { CreateUserInput, UpdateUserInput, User} from "./user.types.js";

export const findUserById = async (id :string) => {
    const user = await UserModel.findById(id);
    if(!user) throw new AppError('User not found' , 404);
    
}

export const findAllUsers = async () => {
    const users = await UserModel.findAll();
    if(!users) throw new AppError('Users not found ' , 404);
    return users;
}

export const updateUserById = async (id : string , changes : UpdateUserInput) =>{
    const user = await UserModel.updateById(id , changes );
    if(!user) throw new AppError('Unable to update user' , 404 )
         return user;
}

export const deleteUserById = async (id : string ) : Promise<null | User[]> => {
    const deleted = await UserModel.deleteById(id);
    return deleted;
}

export const createUser = async (user : CreateUserInput ) => { 
    const existing = await UserModel.findByEmail(user.email);
    if(existing) throw new AppError('Email already exists ' , 409);
      const password_hash = await bcrypt.hash(user.password, 10);
    const newUser = await UserModel.create(
        {
        email : user.email  , password_hash : password_hash
        , username : user.username   
    });

    return newUser;
}