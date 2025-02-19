from fastapi import FastAPI
from routes.auth_routes import router as auth_router
from routes.user_routes import router as user_router
from routes.report_routes import router as report_router
from routes.ai_routes import router as ai_router
from routes import files, iot, chatbot


app = FastAPI(title="Pulmo-Track API", version="1.0")

# Include API routes
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(report_router, prefix="/reports", tags=["Reports"])
app.include_router(ai_router, prefix="/ai", tags=["AI"])
app.include_router(files.router, prefix="/api/files", tags=["Files"])
app.include_router(iot.router, prefix="/api/iot", tags=["IoT"])
app.include_router(chatbot.router, prefix="/api/chatbot", tags=["Chatbot"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Pulmo-Track API"}
