from google.appengine.ext import ndb

class Idea(ndb.Model):
	title = ndb.StringProperty();
	features = ndb.StringProperty(repeated=True);
	dateCreated = ndb.DateProperty(auto_now_add=True);

	
class Feature(ndb.Model):
	parent_idea = ndb.KeyProperty(kind=Idea)
	title = ndb.StringProperty();
	info = ndb.StringProperty();
	links = ndb.StringProperty(repeated=True)
	cavas_url = ndb.StringProperty();
	last_touch_date_time = ndb.DateTimeProperty(auto_now=True)