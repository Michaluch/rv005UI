from models.model import Model
from models.backlogs import BacklogsModel
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
        cursor = self._db.select_one

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
        



if __name__ == "__main__":
    pass