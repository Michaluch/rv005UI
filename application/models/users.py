from model import Model


class UsersModel(Model):
    _fields = {"_id": 1,
               "email": 1,
               "fname": 1,
               "lname": 1,
               "role": 1,
               "avatar": 1,
               "status": 1}

    def __init__(self, ):
        super(UsersModel, self).__init__()
        self._db.collection("users")

    def valid(self, email, password):
        return self._db.check({"email": email, "password": password})

    def exists(self, email):
        return self._db.check({"email": email})

    def add(self, user):
        self._db.insert({"_id": self._counter.user(),
                         "email": user["email"],
                         "password": user["password"],
                         "fname": user["fname"],
                         "lname": user["lname"],
                         "role": user["role"],
                         "avatar": user["avatar"],
                         "status": user["status"]})

    def delete(self, id):
        self._db.delete({"_id": id})

    def edit(self, id, user):
        where = {"_id": id}

        data = {}
        if user["email"] is not None:
            data["email"] = user["email"]
        if user["password"] is not None:
            data["password"] = user["password"]
        if user["fname"] is not None:
            data["fname"] = user["fname"]
        if user["lname"] is not None:
            data["lname"] = user["lname"]
        if user["role"] is not None:
            data["role"] = user["role"]
        if user["avatar"] is not None:
            data["avatar"] = user["avatar"]
        if user["status"] is not None:
            data["status"] = user["status"]

        self._db.update(where, {"$set": data})

    def get(self, param):
        """
        param could be id or email

        usage: u.get(25)
               u.get('blabla@gmail.com')        
        """
        if type(param) is int:
            cursor = self._db.select_one({"_id": param}, self._fields)
        elif type(param) is unicode:
            cursor = self._db.select_one({"email": param}, self._fields)
        else:
            return None

        return cursor[0] if cursor.count() > 0 else None

    def all(self, what=None):
        cursor = self._db.select(what, self._fields)
        return [item for item in cursor]
