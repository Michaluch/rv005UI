from flask import session
from flask import request

from helper import error
from helper import write

from controllers.controller import Controller
from models.stories import StoriesModel


class Stories(Controller):
    # constructor
    def __init__(self):
        super(Stories, self).__init__()
        self._data = StoriesModel()

    def fetch(self, **kwargs):
        action = kwargs.get("action")
        param = kwargs.get("param")

        return error("Invalid request")
