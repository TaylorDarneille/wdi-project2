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

# User Stories

#### Phil's daughter recently moved to the Mission Creek Corrections Center for Women and on their last visit, mentioned that some of the girls in her quad go to coding classes. She wants to join but is shy and doesn't feel comfortable asking the CO's about it. Phil can't find any helpful information on MCCCW's website so he turns to this forum.

#### Jane's husband resides at Washington State Penitentiary. His first visitation is coming up and their two kiddos want to visit him, but Jane is weary of what they may see and doesn't know if it would be appropriate to bring them. Jane chats with other parents on the forum to get a better sense of what the norm is and whether she will bring the little ones on this first visit.

#### Melly's brother was just moved to Olympic Corrections Center which is a 2hr bus ride away. She wants to visit him, but she has work the same day as visitation and can't risk missing the bus back or running into a public transportation delay. She chats with other families that drive to OCC to set up a carpool routine.

#DATABASE: wdi-project2

##TABLES

###Users

| id  | displayName | email             | password |
| --- |:-----------:| :----------------:| :-------:|
| 1   | test Users  | test@testuser.com | test123  |

###Sites*

This is scraped from http://www.doc.wa.gov/corrections/incarceration/default.htm using Cheerio, plus a global (non specific) site row

![DOM img](WDC_DOM.png)

|  id | name        |  abbreviation     |   url |
| --- |:-----------:| :----------------:| :-------:|
|  1  | Airway Heights Corrections Center | AHCC | prisons/ahcc.htm |


###Posts

|  id  |    subject   |    content        |  authorId  |  siteId |
| ---- |:------------:| :----------------:| :-------:| :------:|
|  1   | test subject | 	test content  |    4	 |		3  |

###Comments

|  id  |    content   |   userId |	postId	|
| ---- |:------------:| :-------:| :-------:|
|  1   | test content |    4	 |		2	|

###Topics*

|     id |  name     |
| :----: |:---------:|
|    1   |  category |

JOIN TABLES

###postsTopics

| postId |  topicId      |
| ------ |:-------------:|
|    1   |   99			 |

###usersPosts (this is so users can track posts that they posted OR commented on)

| userId |  postId   |
| :----: |:---------:|
|    1   |  category |


* These tables were prepopulated with data using code in their respective controller files that was run once, then commented out. The sites table never changes, however the topics table is added to each time a user creates a post with topics.

#ROUTES: 

##Controllers:

###Sites
#### - Get / (list of sites)
#### - Get /:id (list of posts for this site)


###Posts
#### - Post / (will create and post new post)
#### - Get /new (will get new post page)
#### - Get / (will get all posts or a list of posts based on the search query)
#### - Get /:id (will display one post)
#### - Delete /:id (deletes post)
#### - Edit /:id (edit form for post)

###Comments
#### - Post / (will create and post new post)

###Topics
#### - Get / (list of topics)
#### - Get /:id (list of posts with that topic)

# Unfulfilled reqs:

#### - Wireframes
#### - Styling

# TODO

#### - update put route and corresponding code to allow users to add/delete/edit topics and also change the site
#### - When a user deletes a post, also delete comments from database and all topics that aren't linked to any other posts.
#### - Implement direct messaging functionality by adding another table "dms"
#### - Utilize moment to display when each post was first written
#### - Add "lastUpdate" column to posts table to keep track of the most recent comment or update to post, then utilize it to display posts in order of updates.
#### - Notifications:
+ Add a notifications number on navbar that shows up when logged in. 
+ Links to posts on dashboards bold (by adding a class) when updated/commented and unbold (remove class) when they are clicked on (event listener).
+ Have front end count number of bold links to calculate notifications number.

###Stretch Goal: incorporate express-mailer



