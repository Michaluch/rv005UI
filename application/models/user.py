# -*- coding: utf-8 -*-
"""
Created on Thu Jan  9 18:00:28 2014

@author: localadmin
"""

from wrapperdb import WrapperDB
from pprint import pprint


class Users(WrapperDB):
    def __init__(self):
        super(Users, self).__init__()
        self.choose_database("bugtracker")
        self.choose_collection("users")
    
    def add_user(self, _id, email, password, fname,
                       lname, role, avatar, status):
        if not self.check_data({"email": email}, "email", email):
            return self.insert_data({"id": _id, "email": email, 
                                     "password": password, "fname": fname,
                                     "lname": lname, "role": role,
                                     "avatar": avatar, "status": status})
        else:
            print "You are trying to add already existing user with email - "+email
            
    
    def get_user(self, query, projection=None):
        cursor = self.get_data(query, projection)
        for row in cursor:
            pprint(row)
    
    def remove_user(self, query):
        self.remove_data(query)