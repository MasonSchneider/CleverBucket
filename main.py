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
from models import Idea, Feature
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
        ideas = [['123', 'Idea Here', [['ff', 'Feature Here', 'description', [['#', 'text'],['#', 'other']], 'data:image/png;base64,iasdf'], ['asdf', 'Feature Me', 'description', [['#', 'text'],['#', 'other']], 'data:image/png;base64,iasdf']]], ['321', 'Two Cool', [['a', 'I\'m cool', 'description', [['#', 'text'],['#', 'other']], 'data:image/png;base64,iasdf']]], ['567', 'Three here', []]]
    	if not user: # not logged in
    		ideas = getStructuredDataFromEmail("anon")
    		self.response.write(template.render({"login_url": users.create_login_url("/"), "username":"Anonymous", "ideas": ideas}))
        else: # logged in
            ideas = getStructuredDataFromEmail(user.email().lower())
            self.response.write(template.render({"logout_url": users.create_logout_url("/"), "username":user.nickname(), "ideas": ideas}))


def getStructuredDataFromEmail(email):
	ideas = []
	idea_query = Idea.query(ancestor=ndb.Key("Entity", email)).order(-Idea.dateCreated)
	for idea in idea_query:
		temp = [idea.key.urlsafe(), idea.title, [], idea.dateCreated]
		temp[2] = getStructuredFeaturesFromKey(idea.key)
		ideas.append(temp)
	return ideas

def getStructuredFeaturesFromKey(key):
	features = []
	feature_query = Feature.query(ancestor=key)
	for feature in feature_query:
		temp = [feature.key.urlsafe(), feature.title, feature.info, [], feature.cavas_url]
		temp[3] = getStructuredLinks(feature.linkText, feature.linkUrl)
		features.append(temp)
	return features

def getStructuredLinks(text, url):
	links = []
	if len(text) <= 0:
		return links
	for i in range(0, len(text)):
		links.append([url[i], text[i]])
	return links


class InsertIdeaAction(webapp2.RequestHandler):
    def post(self):
        user = users.get_current_user()
        new_idea = [];
        if not user:
        	new_idea = Idea(parent=ndb.Key("Entity", "anon"),
        				title=self.request.get("idea-name"))
        else:
        	new_idea = Idea(parent=ndb.Key("Entity",user.email().lower()),
        				title=self.request.get("idea-name"))
        new_idea.put()
        self.redirect(self.request.referer)

class InsertFeatureAction(webapp2.RequestHandler):
    def post(self):
        new_feature = [];
        new_feature = Feature(parent=ndb.Key(urlsafe=self.request.get("idea-key")),
        				title=self.request.get("feature-name"))
        new_feature.put()
        self.redirect(self.request.referer)

class InsertLinkAction(webapp2.RequestHandler):
    def post(self):
		#TODO: backend
		self.redirect(self.request.referer)

class DeleteIdeaAction(webapp2.RequestHandler):
    def post(self):
		idea_key = ndb.Key(urlsafe=self.request.get("idea-key"))
		features_for_key = Feature.query(ancestor=idea_key)
		for feature in features_for_key:
			feature.key.delete()
		idea_key.delete()
		self.redirect(self.request.referer)

class DeleteFeatureAction(webapp2.RequestHandler):
    def post(self):
		feature_key = ndb.Key(urlsafe=self.request.get("feature-key"))
		feature_key.delete()
		self.redirect(self.request.referer)

app = webapp2.WSGIApplication([
    ('/', IndexPage),
	("/insertIdea",InsertIdeaAction),
	("/insertFeature",InsertFeatureAction),
	("/insertLink",InsertLinkAction),
	("/deleteIdea",DeleteIdeaAction),
	("/deleteFeature",DeleteFeatureAction)
	
], debug=True)
