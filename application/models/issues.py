from model import Model
from pprint import pprint


class Issues(Model):
    _fields = {"_id": 1,
               "name": "",
               "description": "",
               "status": "",
               "comments": [],
               "stories": [],
               "sprint": 1
               }

    def __init__(self):
        print "Im here"
        super(Issues, self).__init__()
        self._db.collection("backlog")

    def get_all_issue(self, backlog_id):
        document = self._db.select_one({"_id": backlog_id}, self._fields)
        return document[0]["stories"]

    def get_issue_by_id(self, backlog_id, issue_id):
        list_of_issues = self.get_all_issue(backlog_id)
        for key in list_of_issues:
            if key["_id"] == issue_id:
                return key
        #print document

    def create_issue(self, )


if __name__ == "__main__":
    newissue = Issues()
    pprint(newissue.get_issue_by_id(166, 2))
    #pprint(newissue.get_issue_by_id(166, 1))
