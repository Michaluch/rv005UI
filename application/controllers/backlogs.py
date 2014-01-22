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
        self._data = BacklogsModel({})

    def get_backlogs(self):
        if not self.logged():
            return error("You not logged")
        email = request.values.get("email")
        # empty backlog object
        b = BacklogsModel({})
        backlogs = b.all({"members": email})
        return write(backlogs)

    def fetch(self, **kwargs):
        action = kwargs.get("action")
        param = kwargs.get("param")

        if action == "get_backlogs":
            return write(self.get_backlogs())
        else:
            return error("Invalid request")
