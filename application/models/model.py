from db import DB
from counter import Counter


class Model(object):
    _db = None
    _counter = None

    def __init__(self):
        self._db = DB("mongodb://localhost:27017/")
        self._db.database("bugtracker")

        self._counter = Counter()
        self._counter.create()
