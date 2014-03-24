from flask import session
from flask import request

from helper import error
from helper import write

from controllers.controller import Controller
from models.issues import IssuesModel
#from controllers.subissues import Subissues


class Issues(Controller):
    # constructor
    def __init__(self):
        super(Issues, self).__init__()
        self._data = IssuesModel()

    def get_issues(self):
        if not self.logged():
            return error("You not logged")
        data = self._data.get_all_issues(backlog_id=1)
        return write(data)

    def get_specific_issue(self, issue_id):
        if not self.logged():
            return error("You not logged")
        data = self._data.get_issue_by_id(backlog_id=1, issue_id=issue_id)
        return write(data)

    def add_issue(self, param=None):
        if not self.logged():
            return error("You not logged")
        new_issue = dict(
                name = param.get("name", ""),
                description = param.get("description", ""),
                kind = param.get("kind", ""),
                subissues = param.get("subissues", list()),
                status = param.get("status", ""),
                comments = param.get("comments", list()),
                sprint = param.get("sprint", None),
                estimate = param.get("estimate", None)
                )
        
        _issue_id = self._data.create_issue(1, new_issue)
        return self.get_specific_issue(_issue_id)


    def update_specific_issue(self, param=None, issue_id=None):
        if not self.logged():
            return error("You not logged")
        new_issue = {}

        for key, value in param.items():
            new_issue["issues.$."+key] = value

        self._data.update_issue(backlog_id=1, issue_id=issue_id, new_issue=new_issue)
        return self.get_specific_issue(issue_id)

    def delete_specific_issue(self, issue_id=None):
        if not self.logged():
            return error("You not logged")
        new_issue = {}
        new_issue["issues.$.status"] = "removed"
        self._data.update_issue(backlog_id=1, issue_id=issue_id, new_issue=new_issue)
        return self.get_specific_issue(issue_id)


    def fetch(self, **kwargs):
        cid = kwargs.get("cid")
        param = kwargs.get("param")
        method = kwargs.get("method")

        if cid is None and method == "GET":
        	return self.get_issues()
        if cid and method == "GET":
        	return self.get_specific_issue(cid)
        if cid is None and method == "POST":
        	return self.add_issue(param)
        if cid and method == "PUT":
            return self.update_specific_issue(param, cid)
        if cid and method == "DELETE":
            return self.delete_specific_issue(cid)


        return error("Invalid request")
