FROM python:3.8

COPY requirements.txt .

RUN ["pip", "install", "-r", "requirements.txt"]

COPY . .

EXPOSE 8000
CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:8000", "-k", "uvicorn.workers.UvicornWorker", "app:create_app()"]

