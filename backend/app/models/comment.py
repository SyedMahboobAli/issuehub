from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime
from datetime import datetime
from app.db.base import Base

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True)
    issue_id = Column(ForeignKey("issues.id"))
    author_id = Column(ForeignKey("users.id"))
    body = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)