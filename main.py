#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

from google.appengine.ext import ndb
from google.appengine.api import users
from models import Idea
import webapp2
import os
import jinja2

jinja_env = jinja2.Environment(
						loader=jinja2.FileSystemLoader(
									os.path.dirname(__file__)), 
						autoescape=True)

class IndexPage(webapp2.RequestHandler):
    def get(self):
    	user = users.get_current_user()
    	template = jinja_env.get_template("templates/index.html")
    	if not user:
    		#TODO Query a general anon account to fill with data
			
    		self.response.write(template.render({"login_url": users.create_login_url("/")}))
    	else:
    		#ideas = Idea.query(Idea.creator == user )
    		self.response.write(template.render({"logout_url": users.create_logout_url("/")}))
		
class InsertIdeaAction(webapp2.RequestHandler):
    def post(self):
		#TODO: add backend stuff here
		self.redirect(self.request.referer)

class InsertFeatureAction(webapp2.RequestHandler):
    def post(self):
		#TODO: add backend
		self.redirect(self.request.referer)
class InsertLinkAction(webapp2.RequestHandler):
    def post(self):
		#TODO: backend
		self.redirect(self.request.referer)

class DeleteIdeaAction(webapp2.RequestHandler):
    def post(self):
		#TODO: Backend stuff
		self.redirect(self.request.referer)

class DeleteFeatureAction(webapp2.RequestHandler):
    def post(self):
		#TODO: Backend stuff
		self.redirect(self.request.referer)

app = webapp2.WSGIApplication([
    ('/', IndexPage),
	("/insertIdea",InsertIdeaAction),
	("/insertFeature",InsertFeatureAction),
	("/insertLink",InsertLinkAction),
	("/deleteIdea",DeleteIdeaAction),
	("/deleteFeature",DeleteFeatureAction)
	
], debug=True)
