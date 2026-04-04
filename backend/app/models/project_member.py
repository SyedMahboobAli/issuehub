from sqlalchemy import Column, Integer, ForeignKey, String
from app.db.base import Base

class ProjectMember(Base):
    __tablename__ = "project_members"

    project_id = Column(ForeignKey("projects.id"), primary_key=True)
    user_id = Column(ForeignKey("users.id"), primary_key=True)
    role = Column(String)  # member / maintainer