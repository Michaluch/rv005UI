import json

from flask import Flask
from flask import render_template

from helper import error
from controllers.users import Users


app = Flask("Bugtrack")
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


@app.errorhandler(404)
def not_found(e):
    return error("Invalid request"), 404


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/user/")
@app.route("/user/<int:param>/")
@app.route("/user/<string:action>/", methods=["GET", "POST"])
@app.route("/user/<string:action>/<string:param>/")
@app.route("/user/<string:action>/<int:param>/")
def user(action=None, param=None):
    return Users().fetch(action=action, param=param)

    


if __name__ == "__main__":
    # shop.run(host="0.0.0.0", port=8080)
    app.run(port=8080, debug=True)
