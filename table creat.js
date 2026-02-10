import db from './db.js';


export const Create_Client_table = async () => {
  try {
    const text = `CREATE TABLE IF NOT EXISTS clients (
    client_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    dob DATE,
    nic VARCHAR(20) UNIQUE,
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
    const res = await db.query(text);
    console.log('succefuly created client table. ');

  } catch (error) {
    console.log("Can't create client table. ");
  }
}

export const Create_account_table = async () => {
  try {
    const text = `CREATE TABLE IF NOT EXISTS accounts (
    account_id SERIAL PRIMARY KEY,
    client_id INT REFERENCES clients(client_id) ON DELETE CASCADE,
    account_type VARCHAR(20),
    balance NUMERIC(12,2) DEFAULT 0,
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
    const res = await db.query(text);
    console.log('succefuly created account table. ');
  } catch (error) {
    console.log("Can't create account table. ");
  }
}

export const Create_transactions_table = async () => {
  try {
    const text = `CREATE TABLE IF NOT EXISTS transactions (
    transaction_id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(account_id) ON DELETE CASCADE,
    type VARCHAR(20),
    amount NUMERIC(12,2),
    description TEXT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
    const res = await db.query(text);
    console.log('succefuly created transsaction table. ');
  } catch (error) {
    console.log("Can't create transaction table. ");
  }
}

export const Create_loans_table = async () => {
  try {
    const text = `CREATE TABLE IF NOT EXISTS loans (
    loan_id SERIAL PRIMARY KEY,
    client_id INT REFERENCES clients(client_id) ON DELETE CASCADE,
    loan_type VARCHAR(30),
    amount NUMERIC(12,2),
    interest_rate NUMERIC(5,2),
    start_date DATE,
    end_date DATE,
    status VARCHAR(20)
);
`
    const res = await db.query(text);
    console.log('succefuly created loan table. ');
  } catch (error) {
    console.log("Can't create loan table. ");
  }
}


export const Create_loan_payments_table = async () => {
  try {
    const text = `CREATE TABLE IF NOT EXISTS loan_payments (
    payment_id SERIAL PRIMARY KEY,
    loan_id INT REFERENCES loans(loan_id) ON DELETE CASCADE,
    payment_date DATE,
    amount NUMERIC(12,2),
    remaining_balance NUMERIC(12,2)
);
`
    const res = await db.query(text);
    console.log('succefuly created loan_payment table. ');
  } catch (error) {
    console.log("Can't create loan_payment table. ");
  }
}

export const Create_employees_table = async () => {
  try {
    const text = `CREATE TABLE IF NOT EXISTS employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role VARCHAR(30),
    email VARCHAR(100) UNIQUE,
    password_hash TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
    const res = await db.query(text);
    console.log('succefuly created employee table. ');
  } catch (error) {
    console.log("Can't create employee table. ");
  }
}

export const Create_account_access_log_table = async () => {
  try {
    const text = `CREATE TABLE IF NOT EXISTS account_access_log (
    log_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(employee_id),
    account_id INT REFERENCES accounts(account_id),
    action VARCHAR(30),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
    const res = await db.query(text);
    console.log('succefuly created account_acces_log table. ');
  } catch (error) {
    console.log("Can't create account_acces_log table. ");
  }
}
