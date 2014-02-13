import json
import hashlib


def write(text):
    return json.dumps(text)


def error(text, code=0):
    return json.dumps({"result": "error", "error": {"code": 0, "text": text}})


def sha512(text):
    return hashlib.sha512(text).hexdigest()
