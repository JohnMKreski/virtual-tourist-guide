import * as mongodb from "mongodb";
import { Activity } from "./interfaces/activity";

export const collections: {
    activities?: mongodb.Collection<Activity>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    //Database in Cluster
    const db = client.db("virtualTouristGuide");
    await applySchemaValidation(db);

    const activitiesCollection = db.collection<Activity>("activities");
    collections.activities = activitiesCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Activity model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["activityName", "location", "difficultyLevel"],
            additionalProperties: false,
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "'_id' is a objectId that uniquely identifies the document",
                },
                activityName: {
                    bsonType: "object",
                    description: "'activityName' is required and is a string",
                },
                location: {
                    bsonType: "string",
                    description: "'location' is required and must be an object with latitude and longitude",
                    required: ["lat", "lng"],
                    properties: {
                        //MongoDB uses the double type for floating-point numbers, 
                        //which is suitable for latitude and longitude values.
                        lat: {
                            bsonType: "double",
                            description: "'lat' is the latitude and must be a double",
                        },
                        lng: {
                            bsonType: "double",
                            description: "'lng' is the longitude and must be a double",
                        },
                    },
                },
                difficultyLevel: {
                    bsonType: "string",
                    description: "'difficultyLevel' is required and is one of 'Beginner', 'Intermediate', or 'Advanced'",
                    enum: ["Beginner", "Intermediate", "Advanced"],
                },
            },
        },
    };


    // Try applying the modification to the collection, if the collection doesn't exist, create it 
   await db.command({
        collMod: "activities",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("activities", {validator: jsonSchema});
        }
    });
}