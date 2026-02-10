import db from "../db.js";

export const record_transaction = async (req, res) => {
    try {
        const {
            account_id,
            type, // deposit, withdrawal, transfer
            amount,
            description
        } = req.body;

        // Account is have or not
        const acc_ID = `SELECT 1 FROM accounts WHERE account_id = $1`;
        const exists = await db.query(acc_ID, [account_id]);

        if (exists.rowCount === 0) {
            return res.status(409).json({
                is_account_have: false,
                message: "Can't found account"
            });
        }

        // get account balance 
        const accountQuery = `
      SELECT balance 
      FROM accounts 
      WHERE account_id = $1
      FOR UPDATE;
    `;
        const accountResult = await db.query(accountQuery, [account_id]);
        let currentBalance = Number(accountResult.rows[0].balance);
        let newBalance;

        //  ditdraw and deposite
        if (type === "Deposit") {
            newBalance = currentBalance + Number(amount);
        }
        else if (type === "WIT") {
            if (currentBalance < amount) {
                // await client.query("ROLLBACK");
                return res.status(400).json({
                    success: false,
                    message: "Insufficient balance"
                });
            }
            newBalance = currentBalance - Number(amount);
        }
      /*  else {
            // await client.query("ROLLBACK");
            return res.status(400).json({
                success: false,
                message: "Invalid transaction type"
            });
        }*/

        const updateBalanceQuery = `
      UPDATE accounts 
      SET balance = $1
      WHERE account_id = $2 ;
    `;
        const updateResult = await db.query(updateBalanceQuery, [newBalance, account_id])

        try {
            const updateLatestdate = `UPDATE accounts 
      SET created_at = $1
      WHERE account_id = $2 ;`;

            const updateDateResult = await db.query(updateLatestdate, [new Date(), account_id])
        } catch (error) {
            console.log("Can't update change", error);

        }


        // Insert transaction record

        const insertQuery = `
    INSERT INTO transactions (
    account_id,
    type,
    amount,
    description,
    transaction_date
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`;

        const values = [
            account_id,
            type, // deposit, withdrawal, transfer
            amount,
            description,
            new Date()
        ]

        const result = await db.query(insertQuery, values)
        console.log(result.rows[0]);

        return res.status(201).json({
            success: true,
            message: "Transaction is recorded succesfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Transaction is recored is error : ", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}