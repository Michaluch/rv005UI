from flask import session
from flask import request

from helper import error
from helper import write

from controllers.controller import Controller
from models.tasks import TasksModel


class Tasks(Controller):
    # constructor
    def __init__(self):
        super(Tasks, self).__init__()
        self._data = TasksModel()

    def fetch(self, **kwargs):
        action = kwargs.get("action")
        param = kwargs.get("param")

        return error("Invalid request")
