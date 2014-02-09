from db import DB


class Counter(object):
    _db = None

    def __init__(self):
        self._db = DB("mongodb://rv005UI:pass123@troup.mongohq.com:10012/IssueTracker")
        self._db.database("IssueTracker")
        self._db.collection("counter")

    def create(self):
        if not(self._db.check({"_id": "user"})):
            self._db.insert({"_id": "user", "next": 0})
        if not(self._db.check({"_id": "backlog"})):
            self._db.insert({"_id": "backlog", "next": 0})
        if not(self._db.check({"_id": "story"})):
            self._db.insert({"_id": "story", "next": 0})
        if not(self._db.check({"_id": "task"})):
            self._db.insert({"_id": "task", "next": 0})
        if not(self._db.check({"_id": "comment"})):
            self._db.insert({"_id": "comment", "next": 0})

    def _next(self, name):
        document = self._db.update_and_select({"_id": name},
                                              {"$inc": {"next": 1}})
        return document["next"]

    def user(self):
        return self._next("user")

    def backlog(self):
        return self._next("backlog")
	
    def story(self):
        return self._next("story")

    def task(self):
        return self._next("task")

    def comment(self):
        return self._next("comment")


    
