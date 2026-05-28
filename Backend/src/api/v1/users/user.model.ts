import { query } from "#config/db.js";
import { getSetClauseAndValues } from "#utils/db-operations.js";

import { UpdateUserInput, User } from "./user.types.js";


export const UserModel = {
  create: async (user: Omit<User , 'created_at' | 'id' >) => {
    const rows = await query<User>(
      `INSERT INTO users (email , username , password_hash) 
            VALUES ($1 , $2, $3) 
            RETURNING id, email, username, created_at`,
      [user.email, user.username, user.password_hash],
    )
    return rows[0]?? null;

  },
  deleteById: (id: string) =>
    query<User>(
      `
        DELETE 
        FROM users
        WHERE user.id = $1`,
      [id],
    ),
  findAll: () =>
    query<User>(
      `SELECT id, email, username, created_at 
            FROM users`,
    ),

  findByEmail : async (email : string) => { 
    const rows =  await query<User>(
      `SELECT id, email, username, created_at 
            FROM users 
            WHERE email= $1`,
      [email],
    )
    return rows[0]?? null;
  },
    findById: async (id: string) => {
    const rows = await query<User>(
      `SELECT id, email, username, created_at 
            FROM users 
            WHERE id= $1`,
      [id],
    )
      return rows[0]?? null;

  } ,
    

  findInRange: (limit: number, offset: number) =>
    query<User>(
      `SELECT id, email, username, created_at 
            FROM users 
            ORDER BY id LIMIT $1 OFFSET $2`,
      [limit, offset],
    ),
  updateById: (id: string, valuesToChange: UpdateUserInput) => {
    // Get list of non-undefined changes

    const result = getSetClauseAndValues(valuesToChange);
    // If there are no changes, just return the unchanged user
    if (result === null) return UserModel.findById(id);
    const { clause, values } = result;

    return query<User>(
      `UPDATE users
     SET ${clause}
     WHERE id = $1
     RETURNING id, email, username, created_at`,
      [id, ...values],
    );
  },
};
