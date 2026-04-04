from fastapi import APIRouter, Depends
from app.core.deps import get_current_user
from app.schemas.user import UserResponse
from app.db.deps import require_admin,require_role

router = APIRouter(prefix="/api", tags=["User"])

@router.get("/me", response_model=UserResponse)
def get_me(current_user = Depends(get_current_user)):
    return current_user

@router.get("/me")
def get_me(current_user = Depends(get_current_user)):
    return current_user

@router.get("/admin")
def admin_only(user = Depends(require_admin)):
    return {"message": "Welcome Admin"}

@router.get("/manager")
def manager_only(user = Depends(require_role("admin"))):
    return {"message": "Admin access granted"}

