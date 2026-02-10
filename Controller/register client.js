import db from "../db.js";

export async function client_enter(req, res) {
  try {
    const {
      f_name,
      l_name,
      birth,
      nic,
      email,
      phone,
      address
    } = req.body;

    //  Check NIC existence
    const checkNIC = `SELECT 1 FROM clients WHERE nic = $1`;
    const exists = await db.query(checkNIC, [nic]);

    if (exists.rowCount > 0) {
      return res.status(409).json({
        NIC_EXSIST: true,
        message: "NIC already registered"
      });
      return;
    }

    //  Insert client
    const insertQuery = `
      INSERT INTO clients (
        first_name,
        last_name,
        dob,
        nic,
        email,
        phone,
        address,
        created_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;
    `;

    const values = [
      f_name,
      l_name,
      birth,
      nic,
      email,
      phone,
      address,
      new Date()
    ];

    const result = await db.query(insertQuery, values);

    return res.status(201).json({
      success: true,
      message: "Client created successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Client insert error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
