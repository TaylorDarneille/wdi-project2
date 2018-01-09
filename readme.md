#NODE PACKAGES USED:
- async
- bcrypt
- body-parser
- cheerio
- connect-flash
- dotenv
- ejs
- express
- express-ejs-layouts
- express-session
- passport
- passport-facebook
- passport-local
- pg
- pghstore
- request
- sequelize
- [POSSIBLE] express-mailer


#DATABASE: wdi-project2

##TABLES

###Users

| id  | displayName | email             | password |
| --- |:-----------:| :----------------:| :-------:|
| 1   | test Users  | test@testuser.com | test123  |

###Sites

This is scraped from http://www.doc.wa.gov/corrections/incarceration/default.htm using Cheerio, plus a global (non specific) site row

![DOM img](WDC_DOM.png)

|  id | name        |  abbreviation     |   url |
| --- |:-----------:| :----------------:| :-------:|
|  1  | Airway Heights Corrections Center | AHCC | prisons/ahcc.htm |

###Posts

|  id  |    subject   |    content        |  userId  |  siteId |
| ---- |:------------:| :----------------:| :-------:| :------:|
|  1   | test subject | 	test content  |    4	 |		3  |

###Comments

|  id  |    content   |   userId |	postId	|
| ---- |:------------:| :-------:| :-------:|
|  1   | test content |    4	 |		2	|

###Topics

|     id |  name     |
| :----: |:---------:|
|    1   |  category |

JOIN TABLES

###postsTopics

| postId |  topicId      |
| ------ |:-------------:|
|    1   |   99			 |

###usersPosts (this is so users can track posts)

| userId |  postId   |
| :----: |:---------:|
|    1   |  category |

#ROUTES: 

##Controllers:

###Sites
#### - Get / (list of sites)
#### - Get /:id (list of posts for this site)


###Posts
#### - Post / (will create and post new post)
#### - Get /new (will get new post page)
#### - Get / (will get all posts)
#### - Get /:id (will display one post)
[there should be one more route that gets all posts with a specific site id AND topic]

###Comments
#### - Post / (will create and post new post)

###Topics
#### - Get / (list of topics)
#### - Get /:id (list of posts with that topic)

###Stretch Goal: incorporate express-mailer



