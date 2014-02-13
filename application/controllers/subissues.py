'''from flask import session
from flask import request

from helper import error
from helper import write

from controllers.controller import Controller
from models.subissues import SubissuesModel


class Subissues(Controller):
    # constructor
    def __init__(self):
        super(Subissues, self).__init__()
        self._data = SubissuesModel()

    def fetch(self, **kwargs):
        action = kwargs.get("action")
        param = kwargs.get("param")

        return error("Invalid request")
'''