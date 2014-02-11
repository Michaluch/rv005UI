from model import Model


class SubissuesModel(Model):
    def __init__(self, ):
        super(SubissuesModel, self).__init__()
        self._db.collection("backlog")
    