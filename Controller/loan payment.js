import db from "../db.js";

export const loan_payment = async (req, res) => {
    try {
        const {
            loan_id,
            payment_date,
            amount,
        } = req.body;


        const lo_ID = `SELECT 1 FROM loans WHERE loan_id = $1`;
        const exists = await db.query(lo_ID, [loan_id]);

        if (exists.rowCount === 0) {
            return res.status(409).json({
                is_account_have: false,
                message: "Loan ID is incorrect.... "
            });
        }

        //Get loan balance

        const loanQuery = `
      SELECT amount 
      FROM loans 
      WHERE loan_id = $1
      FOR UPDATE;
    `;
        const loanResult = await db.query(loanQuery,[loan_id]);
        let currentBalance = Number(loanResult.rows[0].amount);
        console.log(currentBalance);
        

        //Insert loan payment 


        let remaining_balance = currentBalance - amount
        const insertQuery = `
    INSERT INTO loan_payments (
    loan_id,
    payment_date,
    amount ,
    remaining_balance  ) VALUES ($1, $2, $3, $4)
      RETURNING *;`;

        const values = [
            loan_id,
            payment_date,
            amount,
            remaining_balance
        ]

        const result = await db.query(insertQuery, values)
        console.log(result.rows[0]);
        return res.status(201).json({
            success: true,
            message: "Loan paymets is  is recorded succesfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.log("Can't enter payment record", error);

    }
}