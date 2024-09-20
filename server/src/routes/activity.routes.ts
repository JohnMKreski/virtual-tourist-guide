import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";

export const activityRouter = express.Router();
activityRouter.use(express.json());

activityRouter.get("/", async (_req, res) => {
    try {
        const activities = await collections?.activities?.find({}).toArray();
        res.status(200).send(activities);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

activityRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const activity = await collections?.activities?.findOne(query);

        if (activity) {
            res.status(200).send(activity);
        } else {
            res.status(404).send(`Failed to find an activity: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an activity: ID ${req?.params?.id}`);
    }
});

activityRouter.post("/", async (req, res) => {
    try {
        const activity = req.body;
        const result = await collections?.activities?.insertOne(activity);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new activity: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new activity.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

activityRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const activity = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.activities?.updateOne(query, { $set: activity });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an activity: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find an activity: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an activity: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

activityRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.activities?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an activity: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an activity: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an activity: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});