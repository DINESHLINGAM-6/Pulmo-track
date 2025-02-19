from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import PyMongoError
from bson import ObjectId
from typing import Optional, Dict, List, Any
import logging
import os
from datetime import datetime

# Environment variables
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "pulmo_track")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MongoService:
    def __init__(self):
        self.client: Optional[AsyncIOMotorClient] = None
        self.db = None
        
    async def connect(self):
        try:
            self.client = AsyncIOMotorClient(MONGO_URI)
            self.db = self.client[DB_NAME]
            
            # Create indexes
            await self.db.users.create_index("email", unique=True)
            await self.db.users.create_index("username", unique=True)
            await self.db.reports.create_index([("patient_id", 1), ("uploaded_at", -1)])
            await self.db.files.create_index("file_id", unique=True)
            
            logger.info("Connected to MongoDB")
        except Exception as e:
            logger.error(f"Could not connect to MongoDB: {e}")
            raise

    async def close(self):
        if self.client:
            self.client.close()
            logger.info("MongoDB connection closed")

    # User Operations
    async def create_user(self, user_data: Dict) -> str:
        try:
            user_data["_id"] = ObjectId()
            user_data["registration_date"] = datetime.utcnow()
            result = await self.db.users.insert_one(user_data)
            return str(result.inserted_id)
        except PyMongoError as e:
            logger.error(f"Error creating user: {e}")
            raise

    async def get_user_by_email(self, email: str) -> Optional[Dict]:
        try:
            return await self.db.users.find_one({"email": email})
        except PyMongoError as e:
            logger.error(f"Error finding user by email: {e}")
            raise

    async def update_user(self, user_id: str, update_data: Dict) -> bool:
        try:
            result = await self.db.users.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": update_data}
            )
            return result.modified_count > 0
        except PyMongoError as e:
            logger.error(f"Error updating user: {e}")
            raise

    # Report Operations
    async def save_report(self, report_data: Dict) -> str:
        try:
            report_data["_id"] = ObjectId()
            report_data["uploaded_at"] = datetime.utcnow()
            result = await self.db.reports.insert_one(report_data)
            return str(result.inserted_id)
        except PyMongoError as e:
            logger.error(f"Error saving report: {e}")
            raise

    async def get_user_reports(
        self,
        patient_id: str,
        skip: int = 0,
        limit: int = 10,
        filters: Optional[Dict] = None
    ) -> List[Dict]:
        try:
            query = {"patient_id": patient_id}
            if filters:
                query.update(filters)
                
            cursor = self.db.reports.find(query)\
                .sort("uploaded_at", -1)\
                .skip(skip)\
                .limit(limit)
            
            return await cursor.to_list(length=limit)
        except PyMongoError as e:
            logger.error(f"Error retrieving reports: {e}")
            raise

    # File Operations
    async def save_file(self, file_data: Dict) -> str:
        try:
            file_data["uploaded_at"] = datetime.utcnow()
            result = await self.db.files.insert_one(file_data)
            return str(result.inserted_id)
        except PyMongoError as e:
            logger.error(f"Error saving file: {e}")
            raise

    async def get_file(self, file_id: str) -> Optional[Dict]:
        try:
            return await self.db.files.find_one({"file_id": file_id})
        except PyMongoError as e:
            logger.error(f"Error retrieving file: {e}")
            raise

    async def delete_file(self, file_id: str) -> bool:
        try:
            result = await self.db.files.delete_one({"file_id": file_id})
            return result.deleted_count > 0
        except PyMongoError as e:
            logger.error(f"Error deleting file: {e}")
            raise

    # Vital Signs Operations
    async def update_vital_signs(self, user_id: str, vital_data: Dict) -> bool:
        try:
            vital_data["updated_at"] = datetime.utcnow()
            result = await self.db.users.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": vital_data}
            )
            return result.modified_count > 0
        except PyMongoError as e:
            logger.error(f"Error updating vital signs: {e}")
            raise

    # Settings Operations
    async def update_user_settings(self, user_id: str, settings: Dict) -> bool:
        try:
            result = await self.db.users.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": {"settings": settings}}
            )
            return result.modified_count > 0
        except PyMongoError as e:
            logger.error(f"Error updating user settings: {e}")
            raise

# Create a singleton instance
db_service = MongoService()

# Export the database instance for use in other modules
db = db_service.db

# Startup and shutdown events for FastAPI
async def connect_to_mongo():
    await db_service.connect()

async def close_mongo_connection():
    await db_service.close()

