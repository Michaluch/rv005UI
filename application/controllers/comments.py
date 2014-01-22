from flask import session
from flask import request

from helper import error
from helper import write

from controllers.controller import Controller
from models.comments import CommentsModel


class Comments(Controller):
    # constructor
    def __init__(self):
        super(Comments, self).__init__()
        self._data = CommentsModel()

    def fetch(self, **kwargs):
        action = kwargs.get("action")
        param = kwargs.get("param")

        return error("Invalid request")
