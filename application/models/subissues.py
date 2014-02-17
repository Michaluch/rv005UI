from models.model import Model
from models.backlogs import BacklogsModel


class SubissuesModel(Model):
    _fields = {"_id": 1,
               "name": "",
               "description": "",
               "assign to": "",
               "kind": "",
               "status": "",
               "comments": [],
               "estimate": 1
               }
    backlog = BacklogsModel()

    def __init__(self):
        super(SubissuesModel, self).__init__()
        self._db.collection("backlog")
    
    def get_all_subissues(self, backlog_id, issue_id):
        document = self._db.select_one({"_id":backlog_id}, self.backlog._fields)
        list_of_issues = document[0]["issues"]
        for item in list_of_issues:
            if item["_id"] == issue_id:
                return item["subissues"]


    def get_subissue_by_id(self, backlog_id, issue_id, subissue_id):
        list_of_subissues = self.get_all_subissues(backlog_id, issue_id)
        for item in list_of_subissues:
            if item["_id"] == subissue_id:
                return item

    def create_subissue(self, backlog_id, issue_id, subissue):
        """
        parametre subissue is a dictionary
        """
        self._db.push({"_id": backlog_id, "issues._id": issue_id},
                       "issues.$.subissues",
                           {"_id": self._counter.subissue(),
                            "name": subissue.get("name"),
                            "description": subissue.get("description"),
                            "assign to": subissue.get("assign to"),
                            "status": issue.get("status"),
                            "subissues": issue.get("subissues", []),
                            "comments": issue.get("comments", []),
                            "sprint": issue.get("sprint")
                            })

    def update_issue(self, backlog_id, issue_id, new_issue):
        where = {"_id": backlog_id, "issues._id": issue_id}
        self._db.set(where, new_issue)


if __name__ == "__main__":
    newissue = IssuesModel()
    newissue.create_issue(166, {"name": "IssueName", "description": "any other description", "status": "doing"})
    pprint(newissue.get_all_issues(166))
    #pprint(newissue.get_issue_by_id(166, 1))
