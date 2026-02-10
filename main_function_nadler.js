import { Create_account_access_log_table, Create_account_table, Create_Client_table, Create_employees_table, Create_loan_payments_table, Create_loans_table, Create_transactions_table } from './table creat.js';


export function table_reateing() {
    Create_Client_table()
    Create_account_table()
    Create_transactions_table()
    Create_loans_table()
    Create_loan_payments_table()
    Create_employees_table()
    Create_account_access_log_table()
}