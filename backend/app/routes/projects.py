from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.models.project import Project
from app.models.project_member import ProjectMember
from app.models.user import User
from app.db.deps import get_current_user

router = APIRouter(prefix="/api/projects", tags=["Projects"])

@router.post("")
def create_project(name: str, key: str, description: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    project = Project(name=name, key=key, description=description)
    db.add(project)
    db.commit()
    db.refresh(project)

    # Add creator as maintainer
    member = ProjectMember(project_id=project.id, user_id=user.id, role="maintainer")
    db.add(member)
    db.commit()

    return project

@router.get("")
def get_projects(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.query(Project).join(ProjectMember).filter(ProjectMember.user_id == user.id).all()


@router.post("/{project_id}/members")
def add_member(project_id: int, email: str, role: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return {"error": "User not found"}

    member = ProjectMember(project_id=project_id, user_id=user.id, role=role)
    db.add(member)
    db.commit()

    return {"message": "Member added"}