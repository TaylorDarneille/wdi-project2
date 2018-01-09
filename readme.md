#DATABASE: wdi-project2

##TABLES

###Users

| id  | displayName | email             | password |
| --- |:-----------:| :----------------:| :-------:|
| 1   | test Users  | test@testuser.com | test123  |

###Sites

This is scraped from http://www.doc.wa.gov/corrections/incarceration/default.htm using Cheerio.

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

###Categories

|     id |  name     |
| :----: |:---------:|
|    1   |  category |

JOIN TABLES

###usersSites

| userId |  siteId   |
| ------ |:---------:|
|    1   |   test123 |

###postsCategories

| postId |  categoryId   |
| ------ |:-------------:|
|    1   |   99			 |

###usersPosts (this is so users can track posts)

| userId |  postId   |
| :----: |:---------:|
|    1   |  category |


###Stretch Goal: incorporate express-mailer



