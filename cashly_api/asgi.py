import uvicorn
from app import create_app
from app.settings import settings

app = create_app()

if __name__ == "__main__":
    uvicorn.run("asgi:app", host="0.0.0.0", port=8000, log_level="info")