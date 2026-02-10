import express from 'express'
import { client_enter } from '../Controller/register client.js'
import { create_account } from '../Controller/crete account.js';
import { record_transaction } from '../Controller/create transaction.js';
import { create_loan } from '../Controller/create loan.js';
import { loan_payment } from '../Controller/loan payment.js';
import { create_user } from '../Controller/user info.js';
import { accountdatafetch, clientNic, getFromNic, transactiondetails } from '../Controller/uniq data fetch.js';
const router = express.Router()

router.post('/client-register', client_enter);
router.post('/account-create', create_account)
router.post('/record-transaction', record_transaction)
router.post('/loan', create_loan)
router.post('/loan-payment', loan_payment)
router.post('/user-save', create_user)
router.get('/clients-list',clientNic)
router.get('/accounts-list',accountdatafetch)
router.get('/transac-list',transactiondetails)
router.post('/get-nic-data',getFromNic)


router.get('/test', (req, res) => {
  res.json({ message: 'API working' });
});


export default router