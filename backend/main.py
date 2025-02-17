from fastapi import FastAPI
from routes import report_routes, auth_routes, user_routes

app = FastAPI()

app.include_router(report_routes.router, prefix="/api", tags=["Reports"])
app.include_router(auth_routes.router, prefix="/api", tags=["Auth"])
app.include_router(user_routes.router, prefix="/api", tags=["Users"])
