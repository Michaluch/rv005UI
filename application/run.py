import json

from flask import Flask
from flask import render_template

from helper import error
from controllers.users import Users
from controllers.backlogs import Backlogs
from controllers.stories import Stories
from controllers.tasks import Tasks
from controllers.comments import Comments


app = Flask("Bugtrack")
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


@app.errorhandler(404)
def not_found(e):
    return error("Invalid request"), 404


@app.route("/api/user/")
@app.route("/api/user/<int:param>/")
@app.route("/api/user/<string:action>/", methods=["GET", "POST"])
@app.route("/api/user/<string:action>/<string:param>/")
@app.route("/api/user/<string:action>/<int:param>/")
def user(action=None, param=None):
    return Users().fetch(action=action, param=param)


@app.route("/api/backlog/")
@app.route("/api/backlog/<string:action>/", methods=["GET", "POST"])
def backlog(action=None, param=None):
    return Backlogs().fetch(action=action, param=None)


@app.route("/api/story/")
@app.route("/api/story/<string:action>/", methods=["GET", "POST"])
def story(action=None, param=None):
    return Stories().fetch(action=action, param=None)


@app.route("/api/task/")
@app.route("/api/task/<string:action>/", methods=["GET", "POST"])
def task(action=None, param=None):
    return Tasks().fetch(action=action, param=None)


@app.route("/api/comment/")
@app.route("/api/comment/<string:action>/", methods=["GET", "POST"])
def comment(action=None, param=None):
    return Comments().fetch(action=action, param=None)


@app.route("/")
@app.route("/<path:path>")
def index(path=None):
    return render_template("index.html")


if __name__ == "__main__":
    # shop.run(host="0.0.0.0", port=8080)
    app.run(port=8080, debug=True)
