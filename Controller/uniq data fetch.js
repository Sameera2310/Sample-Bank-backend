import db from "../db.js";

export const clientNic = async (req, res) => {
  try {
    const fetchQuery = `SELECT * FROM clients`;
    const clientList = await db.query(fetchQuery);

    return res.status(200).json({
      success: true,
      message: "Clients fetched successfully",
      data: clientList.rows
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const accountdatafetch = async (req, res) => {
  try {
    const fetchQuery = `SELECT * FROM accounts`;
    const accountList = await db.query(fetchQuery);

    return res.status(200).json({
      success: true,
      message: "accounts data  fetched successfully",
      data: accountList.rows
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

export const transactiondetails = async (req, res) => {
  try {
    const fetchQuery = `SELECT * FROM transactions`;
    const transactionlist = await db.query(fetchQuery);

    return res.status(200).json({
      success: true,
      message: "Transactions data  fetched successfully",
      data: transactionlist.rows
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

export const getFromNic = async (req, res) => {
  try {
    const { nic_number } = req.body;

    if (!nic_number) {
      return res.status(400).json({
        success: false,
        message: "NIC is required"
      });
    }


    const fetchQuery = `SELECT 
        a.account_id, 
        c.client_id, 
        c.first_name, 
        c.last_name
      FROM clients c
      JOIN accounts a ON c.client_id = a.client_id
      WHERE c.nic = $1;
    `;

    const responddata = await db.query(fetchQuery, [nic_number])

   return res.status(200).json({
      success: true,
      data: responddata.rows
    });
  } catch (error) {
    console.error("Error fetching account by NIC:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
