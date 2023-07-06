// Validates enviorment variables

export const validateEnv = () => {
    if (!process.env.BOT_TOKEN) {
        console.warn("Missing Discord bot token.");
        return false;        
    }

    if (!process.env.MONGO_URI) {
        console.warn("Missing MongoDb connection string.");
        return false;
    }

    return true;
};