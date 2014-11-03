from google.appengine.ext import ndb

class User(ndb.Model):	
	def get_id(self):
		return self.key.string_id();


class Idea(ndb.Model):
	creator = ndb.KeyProperty(kind=User)
	title = ndb.StringProperty();
	features = ndb.StringProperty(repeated=True);
	dateCreated = ndb.DateProperty();

	
class Feature(ndb.Model):
	parent_idea = ndb.KeyProperty(kind=Idea)
	title = ndb.StringProperty();
	info = ndb.StringProperty();
	links = ndb.StringProperty(repeated=True)
	cavas_url = ndb.StringProperty();
	last_touch_date_time = ndb.DateTimeProperty(auto_now=True)