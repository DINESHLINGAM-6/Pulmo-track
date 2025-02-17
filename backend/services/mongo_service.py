from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "pulmo_track"

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

async def get_db():
    return db
