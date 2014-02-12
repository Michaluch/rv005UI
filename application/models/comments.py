from models.model import Model


class CommentsModel(Model):
    def __init__(self, ):
        super(CommentsModel, self).__init__()
        self._db.collection("backlog")
    