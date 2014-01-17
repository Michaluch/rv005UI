from model import Model
import json

class BacklogModel(Model):
    
    def __init__(self, backlog):
    	"""
        backlog dictionaty must have "name" key
        "members" and "stories" are not required
        """       
        super(BacklogModel, self).__init__()
        self._db.collection("backlogs")
        self.backlog = {"_id": self._counter.backlog(),
                             "name": backlog.get("name"),
                             "members": backlog.get("members", []),
                             "stories": backlog.get("stories", [])}


    def add(self):        
        self._db.insert(self.backlog)


    def delete(self):        
        self._db.delete({"_id": self.backlog.get("_id")})

    def edit(self, new_backlog):
        """
        backlog dictionaty must have "name" key
        "members" and "stories" are not required
        """        
        try:
            data = {"name": backlog["name"], "members": backlog.get("members", []),
                    "stories": backlog.get("stories", [])}
        except KeyError:
            print("Backlog must have name value")
        
        self._db.update(self.backlog, {"$set": data})

    def get(self):
        """
        !!!
        """
        id = self.backlog.get("_id")
        cursor = self._db.select_one({"_id": id}, self.backlog)       
        return cursor[0] if cursor.count() > 0 else None

    def all(self, what=None):
    	"""
    	!!!
    	"""
        cursor = self._db.select(what, self.backlog)
        result = [item for item in cursor]
        return result

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

    def __str__(self):
    	return "<BacklogModel> {0}".format(self.backlog['name'])




if __name__ == "__main__":
    d = {"id" : 1, 
         "name": "Rv-005.UI",
         "members" : [ "admin", "user"],  
         "stories" : [ {
		                "name" : "Bugtracking back-end",
                        "description" : "As a developer",
		                "status" : "doing",
		                "comments" : [],
		                "tasks" : [],
		                "sprint": 1 },
	                  { 
		               "name" : "Bugtracking models-end" ,
		               "description" : "Make User and Bugtracker models"  ,
		               "status" : "to do", 
		               "comments" : [],
		               "tasks" : [],
		               "sprint": 1   } ]
}
    #u = BacklogModel(d)
    #u.add()
    
    
    #print(u.all({"members": "name2"}))
#    u.add(d)
    #u.edit(6, d)
    #print u.get(6)
    #print u.all({"name": "backlog_na"})