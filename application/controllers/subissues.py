from flask import session
from flask import request
from pprint import pprint

from helper import error
from helper import write
import json

from controllers.controller import Controller
from controllers.issues import Issues
from models.subissues import SubissuesModel


class Subissues(Controller):
    def __init__(self):
        super(Subissues, self).__init__()
        self._data = SubissuesModel()


    def get_all(self):
        if not self.logged():
            return error("You not logged")
        data = self._data.get_all()
        return write(data)


    def get_by_id(self, subissue_id):
        if not self.logged():
            return error("You not logged")
        data = self._data.get_by_id(subissue_id=subissue_id)
        return write(data)


    def add(self, param=None):
        if not self.logged():
            return error("You not logged")
        new_subissue = dict(
                name = param.get("name") if param.get("name") else "",
                description = param.get("description") if param.get("description") else "",
                assign_to = param.get("assign_to") if param.get("assign_to") else None, 
                kind = param.get("kind") if param.get("kind") else "",
                status = param.get("status") if param.get("status") else "",
                estimate = param.get("estimate") if param.get("estimate") else None,
                parent = param.get("parent") if param.get("parent") else None
                )
        
        _subissue_id = self._data.add(new_subissue)
        return self.get_by_id(_subissue_id)


    def edit(self, param=None, subissue_id=None): #???
        if not self.logged():
            return error("You not logged")
        new_subissue = {}
        if param.get("name"):
            new_subissue["name"] = param.get("name")
        if param.get("description"):
            new_subissue["description"] = param.get("description")
        if param.get("assign_to"):
            new_subissue["assign_to"] = param.get("assign_to")
        if param.get("kind"):
            new_subissue["kind"] = param.get("kind")
        if param.get("status"):
            new_subissue["status"] = param.get("status")
        if param.get("estimate"):
            new_subissue["estimate"] = param.get("estimate")
        if param.get("parent"):
            new_subissue["parent"] = param.get("parent")
        
        self._data.edit(subissue_id, new_subissue)
        return self.get_by_id(subissue_id)

    def delete(self, subissue_id=None):
        if not self.logged():
            return error("You not logged")
        self._data.edit(subissue_id, {"status": "removed"})
        return self.get_by_id(subissue_id)

    def fetch(self, **kwargs):
        cid = kwargs.get("cid")
        param = kwargs.get("param")
        method = kwargs.get("method")

        if cid is None and method == "GET":
        	return self.get_all()
        if cid and method == "GET":
        	return self.get_by_id(cid)
        if cid is None and method == "POST":
        	return self.add(param)
        if cid and method == "PUT":
            return self.edit(param, cid)
        if cid and method == "DELETE":
            return self.delete(cid)
        return error("Invalid request")
