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


    def update_specific_subissue(self, param=None, issue_id=None, subissue_id=None):
        if not self.logged():
            return error("You not logged")
        issue_controller = Issues()
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
        if param.get("comments"):
            new_subissue["comments"] = param.get("comments")
        if param.get("estimate"):
            new_subissue["estimate"] = param.get("estimate")
        new_subissue["_id"] = subissue_id

        new_issue = {}

        new_issue["issues.$.subissues"] = new_subissue
        document = json.loads(issue_controller.get_specific_issue(issue_id))
        #del(document["_id"])
       
        list_of_subissues = list()
        list_of_subissues = document["subissues"] if len(document["subissues"])>0 else list_of_subissues.append(document["subissues"])
        key = 0
        for item in list_of_subissues:
            
            if item["_id"] == subissue_id:
                list_of_subissues[key] = new_subissue
            key += 1
        document["subissues"] = list_of_subissues
        issue_controller.update_specific_issue(issue_id=issue_id, param=document)
        return self.get_specific_subissue(issue_id, _subissue_id)



    def delete_specific_subissue(self, issue_id=None, subissue_id=None):
        if not self.logged():
            return error("You not logged")

        issue_controller = Issues()

        new_subissue = {}
        new_subissue["_id"] = subissue_id
        new_subissue["status"] = "removed"

        new_issue = {}
        new_issue["issues.$.subissues"] = new_subissue

        document = json.loads(issue_controller.get_specific_issue(issue_id))
        #del(document["_id"])
       
        list_of_subissues = list()
        list_of_subissues = document["subissues"] if len(document["subissues"])>0 else list_of_subissues.append(document["subissues"])
        key = 0
        for item in list_of_subissues:
            
            if item["_id"] == subissue_id:
                list_of_subissues[key] = new_subissue
            key += 1
        document["subissues"] = list_of_subissues
        issue_controller.update_specific_issue(issue_id=issue_id, param=document)
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
        if cid and subcid and method == "PUT":
            return self.update_specific_subissue(param, cid, subcid)
        if cid and subcid and method == "DELETE":
            return self.delete_specific_subissue(cid, subcid)


        return error("Invalid request")
        
