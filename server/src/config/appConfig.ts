import "dotenv/config";

export const config = {
    PORT: parseInt(process.env.PORT || "5000"),
    CONN_STR: process.env.MONGO_URL || "mongodb://localhost:27017",
    DB_NAME: process.env.DBNAME || "subscription",
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET||"hiii"
}

//mongodb+srv://naman:naman@cluster0.lu8git5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0