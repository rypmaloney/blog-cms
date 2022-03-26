# Blog CMS 

This is a basic CMS backend for the blog API. I feel my skill for writing has been atrophying (I haven't written much since I graduated college in 2016 with a degree in English Lit), so hopefully this will give me the means and motive to use that part of my brain. 


This project is broken in to three parts.
1. **The API** - [repository](https://github.com/rypmaloney/blog-api-backend)  There are two main routes dealt with here. /admin/ which coveres requests sent from the CMS I've made, and /api/ which covers requests from the blog front end. 
2. **The CMS** - [live preview](https://rypmaloney.github.io/blog-cms/) - sends requests to the /admin/ routes of the API. All POST/DELETE/UPDATE routes are protected with a JWT.
3. **The Portfolio** - [repository](https://github.com/rypmaloney/portfolio) -  Once completed, this project will send GET requests to the /api/ routes.


## Notes
- Updating information with this CMS is protected with JWT authentication on certain routes for the API. In order to post you need an account, and to make an account you need the admin passcode. 
- This CMS uses TinyMCE for a text editor. 
- Most of the styling is done with Taiwind for fast prototyping. I wasn't exactly trying to make this the most attractive thing I've ever made. I'll be the principle user of this app, so I just want something functional. I'll save those creative juices for the frontend. 

## All posts ordered by date
![All posts page](/public/images/posts.png?raw=true)


## Editing an individual post
![Update post page](/public/images/update.png?raw=true )

## Sign up
![Sign up page](/public/images/create.png?raw=true )