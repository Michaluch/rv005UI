from flask import session
from flask import request

from helper import error
from helper import write

from controllers.controller import Controller
from models.issues import IssuesModel


class Issues(Controller):
    # constructor
    def __init__(self):
        super(Issues, self).__init__()
        self._data = IssuesModel()

    def get_issues(self):
        if not self.logged():
            return error("You not logged")
        data = self._data.get_all_issues(backlog_id=166)
        return write(data)

    def get_specific_issue(self, issue_id):
        if not self.logged():
            return error("You not logged")
        data = self._data.get_issue_by_id(backlog_id=166, issue_id=issue_id)
        return write(data)

    def add_issue(self, param=None):
        if not self.logged():
            return error("You not logged")
        new_issue = dict(
                name = param.get("name") if param.get("name") else "",
                description = param.get("description") if param.get("description") else "",
                kind = param.get("kind") if param.get("kind") else "",
                subissues = param.get("subissues") if param.get("subissues") else list(),
                status = param.get("status") if param.get("status") else "",
                comments = param.get("comments") if param.get("comments") else list(),
                sprint = param.get("sprint") if param.get("sprint") else None,
                estimate = param.get("estimate") if param.get("estimate") else None
                )
        
        _issue_id = self._data.create_issue(166, new_issue)
        return self.get_specific_issue(_issue_id)


    def update_specific_issue(self, param=None, issue_id=None):
        if not self.logged():
            return error("You not logged")
        new_issue = {}
        if param.get("name"):
            new_issue["issues.$.name"] = param.get("name")
        if param.get("description"):
            new_issue["issues.$.description"] = param.get("description")
        if param.get("kind"):
            new_issue["issues.$.kind"] = param.get("kind")
        if param.get("subissues"):
            new_issue["issues.$.subissues"] = param.get("subissues")
        if param.get("status"):
            new_issue["issues.$.status"] = param.get("status")
        if param.get("comments"):
            new_issue["issues.$.comments"] = param.get("comments")
        if param.get("sprint"):
            new_issue["issues.$.sprint"] = param.get("sprint")
        if param.get("estimate"):
            new_issue["issues.$.estimate"] = param.get("estimate")
        self._data.update_issue(backlog_id=166, issue_id=issue_id, new_issue=new_issue)
        return self.get_specific_issue(issue_id)

    def delete_specific_issue(self, issue_id=None):
        if not self.logged():
            return error("You not logged")
        new_issue = {}
        new_issue["issues.$.status"] = "removed"
        self._data.update_issue(backlog_id=166, issue_id=issue_id, new_issue=new_issue)
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
