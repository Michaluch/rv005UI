from flask import session


class Controller(object):
    _data = None

    def __init__(self):
        pass

    def logged(self):
        return True if 'email' in session else False
