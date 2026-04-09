from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.deps import get_db, get_current_user
from app.models.issue import Issue
from app.models.user import User
from app.models.comment import Comment
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.models.issue import Issue

router = APIRouter(prefix="/api", tags=["Issues"])

@router.post("/projects/{project_id}/issues")
def create_issue(project_id: int, title: str, description: str, priority: str,
                 db: Session = Depends(get_db),
                 user: User = Depends(get_current_user)):

    issue = Issue(
        project_id=project_id,
        title=title,
        description=description,
        priority=priority,
        reporter_id=user.id
    )

    db.add(issue)
    db.commit()
    db.refresh(issue)

    return issue

@router.get("/projects/{project_id}/issues")
def get_issues(project_id: int,
               status: str = None,
               priority: str = None,
               q: str = None,
               db: Session = Depends(get_db),
               user: User = Depends(get_current_user)):

    query = db.query(Issue).filter(Issue.project_id == project_id)

    if status:
        query = query.filter(Issue.status == status)

    if priority:
        query = query.filter(Issue.priority == priority)

    if q:
        query = query.filter(Issue.title.ilike(f"%{q}%"))

    return query.all()

@router.get("/issues/{issue_id}")
def get_issue(issue_id: int, db: Session = Depends(get_db)):
    issue = db.query(Issue).filter(Issue.id == issue_id).first()

    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")

    return issue

@router.patch("/issues/{issue_id}")
def update_issue(issue_id: int,
                 title: str = None,
                 description: str = None,
                 status: str = None,
                 priority: str = None,
                 assignee_id: int = None,
                 db: Session = Depends(get_db)):

    issue = db.query(Issue).filter(Issue.id == issue_id).first()

    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")

    # 🔥 FIX: use "is not None"
    if title is not None:
        issue.title = title

    if description is not None:
        issue.description = description

    if status is not None:
        print("UPDATING STATUS TO:", status)   # 🔥 DEBUG
        issue.status = status

    if priority is not None:
        issue.priority = priority

    if assignee_id is not None:
        issue.assignee_id = assignee_id

    db.commit()
    db.refresh(issue)   # 🔥 VERY IMPORTANT

    return issue

@router.delete("/issues/{issue_id}")
def delete_issue(issue_id: int, db: Session = Depends(get_db)):
    issue = db.query(Issue).filter(Issue.id == issue_id).first()

    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")

    db.delete(issue)
    db.commit()

    return {"message": "Deleted"}

@router.get("/issues/{issue_id}/comments")
def get_comments(issue_id: int, db: Session = Depends(get_db)):
    return db.query(Comment).filter(Comment.issue_id == issue_id).all()

@router.post("/issues/{issue_id}/comments")
def add_comment(issue_id: int, body: str,
                db: Session = Depends(get_db),
                user: User = Depends(get_current_user)):

    comment = Comment(
        issue_id=issue_id,
        author_id=user.id,
        body=body
    )

    db.add(comment)
    db.commit()
    db.refresh(comment)

    return comment