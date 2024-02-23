
import { connect, disconnect } from "mongoose";
async function ConnectToDB() {
    try {
        await connect(process.env.MONGODB_URL);
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
        throw new Error("Error connecting to DB");
    }
}

async function CloseDBConnection() {
    try {
        await disconnect();
        console.log("Closed connection to DB");
    } catch (error) {
        console.log(error);
        throw new Error("Error closing connection to DB");
    }
}

export { ConnectToDB, CloseDBConnection };