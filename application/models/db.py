from pymongo import MongoClient


class DB(object):
    _client = None
    _db = None
    _collection = None

    def __init__(self, url):
        self._client = MongoClient(url)

    def database(self, db):
        self._db = self._client[db]

    def collection(self, collection):
        self._collection = self._db[collection]

    def insert(self, what):
        return self._collection.insert(what, safe=True)

    def update(self, where=None, what=None):
        return self._collection.update(where, what, multi=True)

    def save(self, what=None):
        return self._collection.save(what)

    def select(self, where=None, fields=None):
        return self._collection.find(where, fields)

    def select_one(self, where=None, fields=None):
        return self._collection.find(where, fields)

    def check(self, what):
        return self._collection.find(what).count() > 0

    def delete(self, where=None):
        print where
        return self._collection.remove(where)

    def update_and_select(self, where, what):
        return self._collection.find_and_modify(where, what, new=True)

    # Add issue to backlog
    def push(self, where, field, what):
        """
        usage: db.backlog.update(
                                 {backlog_id:1},
                                 {$push: {issues: {name: "name1", sprint: 2}}}
                                 )
        note: the field ("issues") must be array only
        """
        what = {"$push": {field: what}}
        return self._collection.update(where, what)

    # Update an existing issue in backlog 
    def set(self, where, field, what):
        """
        usage: db.backlog.update(
                                 {backlog_id:1},
                                 {$set: {status: "To Do"}
                                 )
        """
        what = {"$set": {field: what}}
        return self._collection.update({where, what})
