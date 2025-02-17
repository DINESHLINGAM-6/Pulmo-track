from fastapi import FastAPI
<<<<<<< HEAD

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}
=======
from routes import report_routes, auth_routes, user_routes

app = FastAPI()

app.include_router(report_routes.router, prefix="/api", tags=["Reports"])
app.include_router(auth_routes.router, prefix="/api", tags=["Auth"])
app.include_router(user_routes.router, prefix="/api", tags=["Users"])
>>>>>>> b39879c20d7317ed195ea8e76b52ca44b708899b
