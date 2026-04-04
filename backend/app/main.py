from fastapi import FastAPI
from app.db.base import Base
from app.db.session import engine

# Import models so they register
from app.models import user, project, project_member, issue, comment
from app.routes import auth

from app.routes import user

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "IssueHub running"}

app.include_router(auth.router)

app.include_router(user.router)