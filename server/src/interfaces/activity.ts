import * as mongodb from "mongodb";

export interface Activity {
    activityName: string;
    // Use an object if you need to store coordinates or similar structured data
    location: {           
        lat: number;
        lng: number;
    };
    difficultyLevel: "Beginner" | "Intermediate" | "Advanced";
    _id?: mongodb.ObjectId;
}