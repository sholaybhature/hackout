Hello there.

A django project is divided into various apps. 
Apps could be an API or an authentication folder or anything. All apps have app-specific settings.
For example a social media site: Ek bda project uske andar friends ka logic ek app mei, authentication ka ek app mei,
browsing feed ka ek app mei etc. All apps can be inter-related. Each app will have it's own database tables and logic.

Workflow for starting a new app: 
Suppose if I want to start users app in hackout.
Run python manage.py startapp users
It'll create new folders with predefined files.

> models.py
If I wants users, I need to know about them. Models are like tables in a database. If you create a model, it'll create a table
in the django database. Instead of writing pure SQL, we use django orm which has similar fields and structure like a traditional database.
It defines all the relations and fields what needs to be in the tables. If I want relation between users and location app, django has a field 
like foreign key i.e one-to-one field; each location will be linked with just one user. Different apps but relationships are
easy to establish in django. 

Look at the api/models.py source code. 

> serializers.py
Wtf do I do with data sitting in a database? To get that data, django runs some sql queries. It pulls out the data and serializers presents it to us 
in a form that is understandable by Python.

> views.py
Wtf do I do with data in Python? Views allow us to present the data into a friendly format, like JSON. Plus, you can do some other stuff here. Make sure
only people who have required access are able to view the data. Validate the data if required. Once you are done with everything, return the HTTP response with the 
data that the user asked for.

> urls.py
How do I know which url should I visit to get the data? This is the directory for all the urls that are in an app. When a user hits that url, 
the corresponding view is triggered. 

> admin.py
Each website has a django admin site where you can get a top-level overview of everything inside your django app. If I want my app to be added to that admin website, I 
need to mention it in this file.

> apps.py
This lets django know that this folder is an app and has information related to the app.

Baaki sb faltu. 

Project specific files:

> settings.py
All the settings that are related to what django manages. 

> urls.py
It contains all the urls that are in the website.

Baaki sb faltu.

> manage.py
Entry point of django.
