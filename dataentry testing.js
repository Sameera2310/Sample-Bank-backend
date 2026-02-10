import db from "./db.js";

const clientdata = {
  f_name: 'John',
  l_name: 'martine',
  birth: '2003-09-06',
  nic: '200322410996',
  email: 'example@gmail.com',
  phone: '0765892345',
  address: 'No 569, Jaffna',
  created_at: new Date()
};
export async function client_enter() {

  const checkNIC = `SELECT nic FROM clients WHERE nic = $1`;
  const exists = await db.query(checkNIC, [clientdata.nic]);

  if (exists.rowCount > 0) {
   console.log("NIC already registered.");
   return {NIC_exist:true}
  }

  try {
    const query = `
      INSERT INTO clients (
        first_name,
        last_name,
        dob,
        nic,
        email,
        phone,
        address,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [
      clientdata.f_name,
      clientdata.l_name,
      clientdata.birth,
      clientdata.nic,
      clientdata.email,
      clientdata.phone,
      clientdata.address,
      clientdata.created_at
    ];

    const res = await db.query(query, values);
    console.log("Successfully inserted client:", res.rows[0]);
  } catch (error) {
    console.error("Failed to insert client data:", error);
  }
}
