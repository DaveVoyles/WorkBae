#WorkBae ( Mailstats )

Work Bae analyzes your work email to determine your main squeeze (at work, that is.)  Stare into Madam Pug-Life’s crystal ball, connect your Outlook account, and watch as Work Bae’s compatibility-based algorithm reveals your [https://en.wikipedia.org/wiki/Work_spouse](“wusband”) or [https://en.wikipedia.org/wiki/Work_spouse](“work wife ”). Workbae utilizes node.js, the Express Framework and the Office Graph APIs.

[![WorkBae Preview](/readmeimages/workbae.PNG)](https://youtu.be/0ZSlTYdQuLE "WorkBae Preview- Click here!")

##Dependancies
1. Variety of node modules listed in the package.json
2. Office365 email account
3. .env file that includes the client id and client secret for the Office Graph

##Getting Started
1. Install Node.js [https://nodejs.org/en/download/](Node.js)
2. Office Graph - Register for a developer key:
2. Clone the repository with: 
`git clone https://github.com/bitchwhocodes/WorkBae.git` or you can download too :) 
3. Create a .env file at the root of the project. This project uses the dotenv node module. https://www.npmjs.com/package/dotenv. Your directory should look like this:
![Env File](readmeimages/envfile.png)
4. Populate your .env file with three variables:
`CLIENT_ID, CLIENT_SECRET` and `CALLBACK_URL`
![Env Screen](readmeimages/envscreen.png). The callback url points to an "authorize" route, which has been created. 

##Registering for a developer key
1. Go to the [Application Registration Portal](https://apps.dev.microsoft.com/Disambiguation?ru=https%3a%2f%2fapps.dev.microsoft.com%2f#/appList) and Sign in with your Office 365 account. 
![Env Screen](readmeimages/login.png)
2. Click 'Add an Application'
![Env Screen](readmeimages/addApplication.png)
3. Generate a New Password and save the password given.
![Env Screen](readmeimages/generatepassword.png)
4. Click Add Platform 
![Env Screen](readmeimages/addplatform.png)
5. Select the web option
![Env Screen](readmeimages/addweb.png)
6. Add the redirect URL that you would like to use. This is the URL you will connect with locally as well as once you deploy.
![Env Screen](readmeimages/redirecturl.png)
