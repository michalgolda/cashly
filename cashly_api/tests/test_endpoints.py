from fastapi import FastAPI
from fastapi.testclient import TestClient

from tests.utils import TestDatabase

from app import create_app, models
from app.dependencies import get_database


app = create_app()
test_db = TestDatabase()
client = TestClient(app)

app.dependency_overrides[get_database] = test_db.get_database

def test_create_spend_category():
    response = client.post(
        "/spend-categories/",
        json={"name": "Food", "color": "#f00"}
    )
    assert response.status_code == 201

    response_data = response.json()

    assert "id" in response_data
    assert response_data["name"] == "Food"
    assert response_data["color"] == "#f00"

def test_get_spend_category():
    spend_category = models.SpendCategory("Food", "#f00")

    with test_db as db:
        with db.session_factory() as session:
            session.query(models.SpendCategory).delete()

            session.add(spend_category)
            session.commit()
            session.refresh(spend_category)

    spend_category_id = spend_category.id

    response = client.get(f"/spend-categories/{spend_category_id}/")
    
    assert response.status_code == 200

    response_data = response.json()

    assert response_data["name"] == "Food"
    assert response_data["color"] == "#f00"
    assert response_data["id"] == spend_category_id

def test_get_spend_category_not_found():
    with test_db as db:
        with db.session_factory() as session:
            session.query(models.SpendCategory).delete()

    response = client.get(f"/spend-categories/0/")

    assert response.status_code == 419

    response_data = response.json()

    assert response_data["message"] == (
        "You have tried get spend " 
        "category but is not found"
    )

def test_get_all_spend_categories():
    spend_category = models.SpendCategory("Food", "#f00")

    with test_db as db:
        with db.session_factory() as session:
            session.query(models.SpendCategory).delete()

            session.add(spend_category)
            session.commit()
            session.refresh(spend_category)

    response = client.get("/spend-categories/")

    assert response.status_code == 200

    response_data = response.json()

    assert len(response_data) == 1

    assert response_data[0]["name"] == "Food"
    assert response_data[0]["color"] == "#f00"
    assert response_data[0]["id"] == spend_category.id

def test_delete_spend_category():
    spend_category = models.SpendCategory("Food", "#f00")

    with test_db as db:
        with db.session_factory() as session:
            session.query(models.SpendCategory).delete()

            session.add(spend_category)
            session.commit()
            session.refresh(spend_category)

    spend_category_id = spend_category.id

    response = client.delete(f"/spend-categories/{spend_category_id}/")

    assert response.status_code == 200

    response_data = response.json()

    assert response_data["name"] == "Food"
    assert response_data["color"] == "#f00"
    assert response_data["id"] == spend_category_id


def test_create_spend():
    response = client.post("/spendings/", json={"amount": 1000})

    assert response.status_code == 201

    response_data = response.json()

    assert "id" in response_data
    assert response_data["amount"] == 1000
    assert response_data["spend_category"] == None

def test_create_spend_with_category():
    spend_category = models.SpendCategory("Food", "#f00")

    with test_db as db:
        with db.session_factory() as session:
            session.query(models.SpendCategory).delete()

            session.add(spend_category)
            session.commit()
            session.refresh(spend_category)

    spend_category_id = spend_category.id

    response = client.post(
        "/spendings/", 
        json={"amount": 1000, "spend_category_id": spend_category_id}
    )

    assert response.status_code == 201

    response_data = response.json()

    assert "id" in response_data
    assert response_data["amount"] == 1000
    assert response_data["spend_category"]["name"] == "Food"
    assert response_data["spend_category"]["color"] == "#f00"
    assert response_data["spend_category"]["id"] == spend_category_id

def test_create_spend_with_category_when_category_not_found():
    response = client.post(
        "/spendings/", 
        json={"amount": 1000, "spend_category_id": "123"}
    )

    assert response.status_code == 419

    response_data = response.json()

    assert response_data["message"] == (
        ("You have tried create spend but " 
        "spend category id is not found")
    )

def test_get_spend():
    spend = models.Spend(None, 1000)

    with test_db as db:
        with db.session_factory() as session:
            session.query(models.Spend).delete()

            session.add(spend)
            session.commit()
            session.refresh(spend)

    spend_id = spend.id

    response = client.get(f"/spendings/{spend_id}/")

    assert response.status_code == 200

    response_data = response.json()

    assert response_data["id"] == spend_id
    assert response_data["amount"] == 1000
    assert response_data["spend_category"] == None

def test_get_spend_not_found():
    response = client.get(f"/spendings/123/")

    assert response.status_code == 419

    response_data = response.json()

    assert response_data["message"] == "You have tried get spend but is not found"

def test_get_spendings():
    spend = models.Spend(None, 1000)

    with test_db as db:
        with db.session_factory() as session:
            session.query(models.Spend).delete()

            session.add(spend)
            session.commit()
            session.refresh(spend)

    response = client.get("/spendings/")

    assert response.status_code == 200

    response_data = response.json()

    assert response_data[0]["id"] == spend.id
    assert response_data[0]["amount"] == spend.amount
    assert response_data[0]["spend_category"] == None

def test_delete_spend():
    spend = models.Spend(None, 1000)

    with test_db as db:
        with db.session_factory() as session:
            session.query(models.Spend).delete()

            session.add(spend)
            session.commit()
            session.refresh(spend)

    spend_id = spend.id

    response = client.delete(f"/spendings/{spend_id}/")

    assert response.status_code == 200

    response_data = response.json()

    assert response_data["id"] == spend_id
    assert response_data["amount"] == 1000
    assert response_data["spend_category"] == None

def test_delete_spend_not_found():
    response = client.delete("/spendings/123/")

    assert response.status_code == 419

    response_data = response.json()

    assert response_data["message"] == "You have tried delete spend but is not found"