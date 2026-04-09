from fastapi import FastAPI
from app.db.base import Base
from app.db.session import engine

# Import models so they register
from app.models import user, project, project_member, issue, comment
from app.routes import auth

from app.routes import user

from app.routes import projects
from app.routes import issues
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (OK for assignment)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "IssueHub running"}

app.include_router(auth.router)

app.include_router(user.router)



app.include_router(projects.router)


app.include_router(issues.router)