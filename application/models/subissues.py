from models.model import Model
from pprint import pprint


class SubissuesModel(Model):
    _fields = {"_id": None,
               "name": "",
               "description": "",
               "assign_to": "",
               "kind": "",
               "status": "",
               "estimate": None,
               "parent": None
               }


    def __init__(self):
        super(SubissuesModel, self).__init__()
        self._db.collection("subissues")
    
    def get_all(self):
        cursor = self._db.select()
        return [item for item in cursor]


    def get_by_id(self, subissue_id):
        cursor = self._db.select_one({"_id": subissue_id})
        return cursor[0] if cursor.count() > 0 else None #??

    def get_by_parent(issue_id):
        cursor = self._db.select({"parent": issue_id})
        return [item for item in cursor]

        
    def add(self, subissue):
        self._db.insert({"_id": self.counter.subissue(),
                         "name": subissue.get("name", ""),
                         "description": subissue.get("description", ""),
                         "assign_to": subissue.get("assign_to", ""), #????
                         "kind": subissue.get("kind", ""),
                         "status": subissue.get("status", ""),
                         "estimate": subissue.get("estimate", None),
                         "parent": subissue.get("parent", None)  #????
                         })
        #return ?

    def edit(self, subissue_id, new_subissue):
        self._db.set({"_id": subissue_id}, new_subissue)
        #return ?

    """def delete(self, subissue_id):
        self._db.set({"id": subissue_id}, {"status": "removed"})
    """




if __name__ == "__main__":
    pass