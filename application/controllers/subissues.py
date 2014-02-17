from flask import session
from flask import request

from helper import error
from helper import write

from controllers.controller import Controller
from models.subissues import SubissuesModel


class Subissues(Controller):
    def __init__(self):
        super(Subissues, self).__init__()
        self._data = SubissuesModel()


    def get_subissues(self, issue_id):
        if not self.logged():
            return error("You not logged")
        data = self._data.get_all_subissues(backlog_id=166, issue_id=issue_id)
        return write(data)


    def get_specific_subissue(self, issue_id, subissue_id):
        if not self.logged():
            return error("You not logged")
        data = self._data.get_subissue_by_id(backlog_id=166, issue_id=issue_id, subissue_id=subissue_id)
        return write(data)


    def fetch(self, **kwargs):
        cid = kwargs.get("cid")
        subcid = kwargs.get("subcid")
        param = kwargs.get("param")
        method = kwargs.get("method")

        if cid and subcid is None and method == "GET":
        	return self.get_subissues(cid)
        if cid and subcid and method == "GET":
        	return self.get_specific_subissue(cid, subcid)
        '''if cid is None and method == "POST":
        	return self.add_issue(param)
        if cid and method == "PUT":
            return self.update_specific_issue(param, cid)
        if cid and method == "DELETE":
            return self.delete_specific_issue(cid)


        return error("Invalid request")
        '''
