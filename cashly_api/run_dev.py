import uvicorn

from app import create_app

app = create_app()

if __name__ == "__main__":
    uvicorn.run(f"{__name__}:app", port=8081, reload=True, host="0.0.0.0")
