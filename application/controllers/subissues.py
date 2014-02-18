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


    def add_subissue(self, issue_id, param=None):
        if not self.logged():
            return error("You not logged")
        new_subissue = dict(
                name = param.get("name") if param.get("name") else "",
                description = param.get("description") if param.get("description") else "",
                assign_to = param.get("assign_to") if param.get("assign_to") else "",
                kind = param.get("kind") if param.get("kind") else "",
                status = param.get("status") if param.get("status") else "",
                comments = param.get("comments") if param.get("comments") else list(),
                estimate = param.get("estimate") if param.get("estimate") else None
                )
        
        _subissue_id = self._data.create_subissue(166, issue_id, new_subissue)
        return self.get_specific_subissue(issue_id, _subissue_id)


    def fetch(self, **kwargs):
        cid = kwargs.get("cid")
        subcid = kwargs.get("subcid")
        param = kwargs.get("param")
        method = kwargs.get("method")

        if cid and subcid is None and method == "GET":
        	return self.get_subissues(cid)
        if cid and subcid and method == "GET":
        	return self.get_specific_subissue(cid, subcid)
        if cid and subcid is None and method == "POST":
        	return self.add_subissue(cid, param)
        '''if cid and method == "PUT":
            return self.update_specific_issue(param, cid)
        if cid and method == "DELETE":
            return self.delete_specific_issue(cid)


        return error("Invalid request")
        '''
