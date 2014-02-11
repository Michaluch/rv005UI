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
        self._data = Issues()

    def fetch(self, **kwargs):
        action = kwargs.get("action")
        param = kwargs.get("param")

        return error("Invalid request")
