from models.model import Model
import json


class BacklogsModel(Model):
    _fields = {"_id": 1,
               "name": "",
               "issues": [],
               "members": [],
               "status": "To do",
               }
    def __init__(self):
    	"""
        backlog dictionaty must have "name" key
        "members" and "issues" are not required
        """       
        super(BacklogsModel, self).__init__()
        self._db.collection("backlog")


    def add(self, backlog):
        self._db.insert({"_id": self._counter.backlog(),
                         "name": backlog.get("name"),
                          "issues": backlog.get("issues", []),
                          "members": backlog.get("members", []),
                          "status": backlog.get("status", 'To do'),
                           })

    def delete(self, id):
        self._db.delete({"_id": id})



    def get(self, param):
        if(isinstance(param, int)):
            cursor = self._db.select_one({"_id": param}, self._fields)
        elif(isinstance(param, str)):
            cursor = self._db.select_one({"name": param}, self._fields)
        else:
            return None

        return cursor[0] if cursor.count() > 0 else None

    def edit(self, id, backlog):
        where = {"_id": id}

        data = {"name": backlog.get("name"),
                "issues": backlog.get("issues", []),
                "members": backlog.get("members", []),
                "status": backlog.get("status", 'To do'),
                }

        self._db.update(where, {"$set": data})



    def all(self, what=None):
        # cursor = self._db.select(what, self.backlog)
        cursor = self._db.select()
        return [item for item in cursor]
    '''
    def create_story(self, story):
    	"""
    	story must have keys: name, status
    	"""
    	# if story doesnt have id generate it
    	id = story.get("_id", self._counter.story())

    	try:
            story = {"_id": id,
                     "name": story["name"], "status": story["status"],
                     "description": story.get("description"), "sprint": story.get("sprint"),
                     "tasks": story.get("tasks", []), "comments": story.get("comments")
            }
            self.backlog["stories"].append(story)
        except KeyError:
            print("name and status are required")
       
        return story

    def add_story(self, story):
    	self.create_story(story)    	
    	self._db.update({"_id": self.backlog.get("_id")},
    	                {"$set": self.backlog.get("stories", [])})
    '''

    def __str__(self):
    	return "<BacklogModel> {0}".format(self.backlog['name'])

