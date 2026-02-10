import express from 'express';
import cors from 'cors'
import { table_reateing } from './main_function_nadler.js';
import BankdRoute from './Router/routes.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const port = process.env._PORT;


app.use(cors({ origin: process.env.FRONT_ORIGIN }));
app.use(express.json())

// Call table creating function
table_reateing()

app.use('/Bank/API', BankdRoute)


app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});
