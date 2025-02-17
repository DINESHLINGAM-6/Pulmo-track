from fastapi import FastAPI
from routes.auth_routes import router as auth_router
from routes.user_routes import router as user_router
from routes.report_routes import router as report_router

app = FastAPI(title="Pulmo-Track API", version="1.0")

# Include API routes
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(report_router, prefix="/reports", tags=["Reports"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Pulmo-Track API"}
