import db from "../db.js";

export const create_loan = async (req, res) => {
    try {
        const {
            client_id,
            loan_type,
            amount,
            interest_rate,
            start_date,
            end_date,
            status  //(approved, pending, rejected)

        } = req.body;

        const cl_ID = `SELECT 1 FROM clients WHERE client_id = $1`;
        const exists = await db.query(cl_ID, [client_id]);

        if (exists.rowCount === 0) {
            return res.status(409).json({
                is_account_have: false,
                message: "You are not the client. So loan can not be issue...."
            });
        }
        


        const insertQuery = `
    INSERT INTO loans (
    client_id ,
    loan_type,
    amount,
    interest_rate,
    start_date,
    end_date,
    status  ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;`;

    

        const values = [
        client_id,
        loan_type,
        amount,
        interest_rate,
        start_date,
        end_date,
        status  //(approved, pending, rejected)
    ]


    if (status === 'approved') {

        const result = await db.query(insertQuery, values)
        console.log(result.rows[0]);

        return res.status(201).json({
            success: true,
            message: "Loan is  is recorded succesfully",
            data: result.rows[0]
        });
    }

} catch (error) {
    console.log("Loan creting is can't do ", error);

}

}