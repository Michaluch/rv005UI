from pymongo import MongoClient


class WrapperDB(object):
    def __init__(self):
        self.client = MongoClient('mongodb://localhost:27017/')

    def choose_database(self, database_name):
        self.db = self.client[database_name]

    def choose_collection(self, collection_name):
        self.collection = self.db[collection_name]

    def insert_data(self, data):
        self.collection.insert(data)

    def get_data(self, query=None, projection=None):
        cursor = self.collection.find(query, projection)
        return cursor

    def update_data(self, query=None, data=None):
        self.collection.update(query, data)

    def remove_data(self, query=None):
        self.collection.remove(query)

    def check_data(self, query, field, name):
        check_field = self.collection.find_one(query)
        if check_field:
            return check_field[field] == name  # false  - [field] != name
        else:
            return False  # check_field is empty

    def find_and_modify(self, query, update, **kwargs):
        return self.collection.find_and_modify(query, update, **kwargs)

    def get_one_document(self, query):
        return self.collection.find_one(query)
