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
        new_issue = {"name": param.get("name", ""),
                     "description": param.get("description", ""),
                     "subissues": param.get("subissues", []),
                     "status": param.get("status", ""),
                     "comments": param.get("comments", []),
                     "sprint": param.get("sprint", "")
        }
        self._data.create_issue(166, new_issue)


    def fetch(self, **kwargs):
        action = kwargs.get("action")
        param = kwargs.get("param")
        method = kwargs.get("method")

        if action is None and method == "GET":
        	return self.get_issues()
        if action and method == "GET":
        	return self.get_specific_issue(action)
        if action is None and method == "POST":
        	return self.add_issue(param)


        return error("Invalid request")




    
    



        
