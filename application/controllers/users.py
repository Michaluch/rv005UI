from flask import session
from flask import request

from helper import error
from helper import write
from helper import sha512

from controllers.controller import Controller
from models.users import UsersModel
from models.backlog import Backlog


class Users(Controller):
    # constructor
    def __init__(self):
        super(Users, self).__init__()
        self._data = UsersModel()

    # login
    def login(self):
        if self.logged():
            return error("You are already logged")

        email = request.values.get("email")
        password = request.values.get("password")

        if email is not None and \
           password is not None and \
           self._data.valid(email, sha512(password)):
            session["email"] = email
            return write("Well done")
        else:
            return error("Incorrect login or password")

    # logout
    def logout(self):
        if not self.logged():
            return error("You not logged")

        session.pop('email', None)
        return write("Well done")

    # register new user
    def register(self):
        if self.logged():
            return error("You are already logged")

        email = request.values.get("email")
        password = request.values.get("password")
        fname = request.values.get("fname")
        lname = request.values.get("lname")
        role = request.values.get("role")
        avatar = request.values.get("avatar")
        status = request.values.get("status")

        if (not (type(email) is unicode)) or (len(email) < 5):
            return error("Incorrect e-mail")

        if (not (type(password) is unicode)) or (len(password) < 5):
            return error("Incorrect password")

        if self._data.exists(email):
            return error("User with this e-mail already exists")

        try:
            self._data.add({"email": email,
                            "password": sha512(password),
                            "fname": fname,
                            "lname": lname,
                            "role": role,
                            "avatar": avatar,
                            "status": status})
            return write("Well done")
        except:
            return error("Registration failed")

    # delete user
    def delete(self):
        if not self.logged():
            return error("You not logged")

        try:
            id = int(request.values.get("id"))
            self._data.delete(id)
            return write("Well done")
        except:
            return error("Invalid request")

    # get user info
    def get(self, param):
        if not self.logged():
            return error("You not logged")

        try:
            if type(param) is int:
                return write(self._data.get(param))
            elif type(param) is unicode:
                return write(self._data.get(param))
            else:
                return write(self._data.get(session["email"]))
        except:
            return error("Invalid request")

    # change user info
    def change(self):
        if not self.logged():
            return error("You not logged")

        user = {"email": request.values.get("email"),
                "password": request.values.get("password"),
                "fname": request.values.get("fname"),
                "lname": request.values.get("lname"),
                "role": request.values.get("role"),
                "avatar": request.values.get("avatar"),
                "status": request.values.get("status")}

        try:
            id = int(request.values.get("id"))
            self._data.edit(id, user)
            return write("Well done")
        except:
            return error("Invalid request")

    # get all user list
    def all(self):
        if not self.logged():
            return error("You not logged")

        try:
            return write(self._data.all())
        except:
            return error("Invalid request")

    def get_backlogs(self):
        if not self.logged():
            return error("You not logged")
        email = request.values.get("email")
        # empty backlog object
        b = Backlog({})
        backlogs = b.all({"members": email})
        return write(backlogs)

    def fetch(self, **kwargs):
        action = kwargs.get("action")
        param = kwargs.get("param")

        if action == "login":
            return self.login()
        elif action == "logout":
            return self.logout()
        elif action == "register":
            return self.register()
        elif action == "delete":
            return self.delete()
        elif action == "get" or action is None:
            return self.get(param)
        elif action == "change":
            return self.change()
        elif action == "all":
            return self.all()
        elif action == "get_backlogs":
            return self.get_backlogs()
        else:
            return error("Invalid request")
