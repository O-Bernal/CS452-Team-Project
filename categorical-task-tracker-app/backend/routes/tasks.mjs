import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

/**
 * GET all tasks
 */
router.get("/", async (req, res) => {
  try {
    const tasks = await db.collection("tasks").find({}).toArray();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST create task
 */
router.post("/", async (req, res) => {
  try {
    const {
      title,
      category,
      startDate,
      startTime,
      endDate,
      endTime,
    } = req.body;

    if (!title || !category) {
      return res.status(400).json({ error: "Title and category required" });
    }

    const task = {
      title,
      category,
      startDate: startDate || null,
      startTime: startTime || null,
      endDate: endDate || null,
      endTime: endTime || null,
      createdAt: new Date(),
      history: [{ action: "created", timestamp: new Date() }],
    };

    const result = await db.collection("tasks").insertOne(task);
    res.status(201).json({ ...task, _id: result.insertedId });
  } catch (err) {
    console.error("POST /api/tasks failed:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE task
 */
router.delete("/:id", async (req, res) => {
  try {
    await db.collection("tasks").deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
