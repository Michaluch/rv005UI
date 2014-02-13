'''from models.model import Model
from models.issues import IssuesModel


class SubissuesModel(Model):
	_fields = {"_id": 1,
               "name": "",
               "description": "",
               "status": "",
               "comments": [],
               "sprint": 1
               }
    issue = IssuesModel()

    def __init__(self):
        super(SubissuesModel, self).__init__()
        self._db.collection("backlog")
    
    def get_all_subissues(self, backlog_id, issue_id):
        document = self._db.select_one({"_id":backlog_id}, self.backlog._fields)
        return document[0]["issues"]

    def get_issue_by_id(self, backlog_id, issue_id):
        """
        get spesific "issue" ("issue" is a dictionary) from list of issues by it's _id
        """
        list_of_issues = self.get_all_issues(backlog_id)
        for item in list_of_issues:
            if item["_id"] == issue_id:
                return item

    def create_issue(self, backlog_id, issue):
        """
        parametre issue is a dictionary
        """
        self._db.push({"_id": backlog_id}, "issues", {"_id": self._counter.issue(),
                                                      "name": issue.get("name"),
                                                      "description": issue.get("description"),
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
'''