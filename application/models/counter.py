# -*- coding: utf-8 -*-
"""
Created on Sun Jan 12 16:49:30 2014

@author: localadmin
"""

from wrapperdb import WrapperDB
from pprint import pprint


class Counter(WrapperDB):
    def __init__(self):
        super(Counter, self).__init__()
        self.choose_database("bugtracker")
        self.choose_collection("counter")

    def create_counter(self):
        self.insert_data({"_id": "userid", "seq": 0})
        self.insert_data({"_id": "backlogid", "seq": 0})
        self.insert_data({"_id": "storyid", "seq": 0})
        self.insert_data({"_id": "taskid", "seq": 0})
        self.insert_data({"_id": "commentid", "seq": 0})

    def get_next_sequence(self, name):
        document = self.find_and_modify(query={"_id": name},
                                        update={"$inc": {"seq": 1}},
                                        new=True)
        return document["seq"]
