import db from "../db.js";


export const create_account = async (req, res) => {
    try {
        const {
            client_id, // client id
            account_type, // saving , fixed,current
            balance = 0,
            status // active , inactive , closed

        } = req.body;

        // chech client id is valid
        const clientid = `SELECT 1 FROM clients WHERE client_id = $1`;
        const exists = await db.query(clientid, [client_id]);

        if (exists.rowCount === 0) {
            return res.status(409).json({
                is_register: false,
                message: "Client is not register registered"
            });
        }

        // check same id have more type of account
        // Check if client already has the same account type
        const checkAccountQuery = `
  SELECT 1 
  FROM accounts 
  WHERE client_id = $1 AND account_type = $2
`;

        const existingAccount = await db.query(checkAccountQuery, [
            client_id,
            account_type
        ]);

        if (existingAccount.rowCount > 0) {
            return res.status(409).json({
                already_have: true,
                message: "This client already has this account type"
            });
        }

        //insert account data

        const insertQuery = `
    INSERT INTO accounts (
        client_id,
        account_type,
        balance,
        status,
        created_at
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`;

        const values = [
            client_id,
            account_type,
            balance,
            status,
            new Date()
        ]

        const result = await db.query(insertQuery, values)

        return res.status(201).json({
            success: true,
            message: "Account is created successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Account is  error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}