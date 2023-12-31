import jwt
from django.conf import settings

def encode(payload):

	token = jwt.encode(
			payload,
			settings.JWT_SECRET,
			algorithm=settings.JWT_ALGORITHM
			)
	print(token)
	return token

def decode(token):
	try:
		decoded = jwt.decode(
			token,
			settings.JWT_SECRET,
			algorithms=[settings.JWT_ALGORITHM]
			)
		print(decoded)
		return decoded
	except:
		return False
