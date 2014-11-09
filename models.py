from google.appengine.ext import ndb

class Idea(ndb.Model):
	title = ndb.StringProperty();
	dateCreated = ndb.DateProperty(auto_now_add=True);

	
class Feature(ndb.Model):
	parent_idea = ndb.KeyProperty(kind=Idea)
	title = ndb.StringProperty();
	info = ndb.StringProperty();
	linkText = ndb.StringProperty(repeated=True)
	linkUrl = ndb.StringProperty(repeated=True)
	canvas_url = ndb.TextProperty();
	last_touch_date_time = ndb.DateTimeProperty(auto_now=True)