import db from "../db.js";

export const create_user = async (req, res) => {
    try {
        const {
        first_name,
        last_name,
        role,
        email,
        password_hash
    } = req.body;

    //Insert User Data

    const userInsertQuery = `
    INSERT INTO employees (
    first_name,
    last_name,
    role ,
    email,
    password_hash,
    created_at
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`;

    const values =[
        first_name,
        last_name,
        role,
        email,
        password_hash,
        new Date()
    ]

    const result = await db.query(userInsertQuery,values)
    console.log(result.rows[0]);
     return res.status(201).json({
            success: true,
            message: "User info is recorded succesfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.log("Can't enter user information",error);
        
    }    
}