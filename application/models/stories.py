from model import Model


class StoriesModel(Model):
    def __init__(self, ):
        super(StoriesModel, self).__init__()
        self._db.collection("backlogs")
    