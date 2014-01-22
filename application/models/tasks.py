from model import Model


class TasksModel(Model):
    def __init__(self, ):
        super(TasksModel, self).__init__()
        self._db.collection("backlogs")
    