from app.authentication import generate_password_hash, check_password_hash

def test_generate_password_hash():
  password_hash = generate_password_hash('qwerty')

  assert password_hash != None

def test_check_password_hash():
  password_hash = generate_password_hash('qwerty')

  assert check_password_hash('qwerty', password_hash)
  assert not check_password_hash('qwerty1', password_hash)