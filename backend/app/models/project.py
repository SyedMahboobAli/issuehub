from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.db.base import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    key = Column(String)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)