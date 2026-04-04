from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from datetime import datetime
from app.db.base import Base

class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True)
    project_id = Column(ForeignKey("projects.id"))
    title = Column(String)
    description = Column(Text)
    status = Column(String, default="open")
    priority = Column(String)
    reporter_id = Column(ForeignKey("users.id"))
    assignee_id = Column(ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)