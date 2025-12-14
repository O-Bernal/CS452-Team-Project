// backend/routes/record.mjs

import express from "express";
import { ObjectId } from "mongodb";
// Correct Import: Must use braces {} and the exact name 'getDb'
import { getDb } from "../db/conn.mjs"; 

const records = express.Router();
// ... rest of your route code using getDb() ...

export default records;