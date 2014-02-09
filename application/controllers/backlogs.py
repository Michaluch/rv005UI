from flask import session
from flask import request

from helper import error
from helper import write

from controllers.controller import Controller
from models.backlogs import BacklogsModel


class Backlogs(Controller):
    # constructor
    def __init__(self):
        super(Backlogs, self).__init__()
        self._data = BacklogsModel()

    def get_backlogs(self):
        if not self.logged():
            return error("You not logged")
        email = request.values.get("email")
        # empty backlog object
        data = self._data.all()

        return write(data)

    def add(self):
        if not self.logged():
            return error("You not logged")

        data = {
            "name": request.values.get('name', ''),
            "members": request.values.get("members", []),
            "stories": request.values.get("stories", []),
            "status": request.values.get("status", "To do")
        }

        try:
            self._data.add(data)
            return write("Well done")
        except:
            return error("failed")


    def delete(self):
        if not self.logged():
            return error("You not logged")
        try:
            self._data.delete(int(request.values.get("_id")))
            return write('Well done')
        except:
            return error('failed')

    def get(self):
        if not self.logged():
            return error("You not logged")

        id = int(request.values.get('_id'))
        backlog = self._data.get(id)
        return write(backlog)

    def edit(self):

        if not self.logged():
            return error("You not logged")
        id = int(request.values.get('_id'))
        data = {
            "name": request.values.get('name', ''),
            "members": request.values.get("members", []),
            "stories": request.values.get("stories", []),
            "status": request.values.get("status", "To do")
        }

        self._data.edit(id, data)
        return write(data)

    def change_status(self):
        id = int(request.values.get("_id"))
        status = {"status": request.values.get("status")}
        self._data.edit(id, status)
        return write("Well done")


    def fetch(self, **kwargs):

        action = kwargs.get("action")
        param = kwargs.get("param")


        if action == "get_backlogs":
            return self.get_backlogs()
        if action == "add":
            return self.add()
        if action == "delete":
            return self.delete()
        if action == "get":
            return self.get()
        if action == "edit":
            return self.edit()
        if action == "change_status":
            return self.change_status()

        else:
            return error("Invalid request")
