#WorkBae ( Mailstats )

Work Bae analyzes your work email to determine your main squeeze (at work, that is.)  Stare into Madam Pug-Life’s crystal ball, connect your Outlook account, and watch as Work Bae’s compatibility-based algorithm reveals your [https://en.wikipedia.org/wiki/Work_spouse](“wusband”) or [https://en.wikipedia.org/wiki/Work_spouse](“work wife ”). Workbae utilizes node.js, the Express Framework and the Office Graph APIs.

##Dependancies
1. Variety of node modules listed in the package.json
2. Office365 email account
3. .env file that includes the client id and client secret for the Office Graph

##Getting Started
1. Install Node.js[https://nodejs.org/en/download/](Node.js)
2. Clone the repository with: 
`git clone https://github.com/bitchwhocodes/WorkBae.git` or you can download too :) 
3. Create a .env file at the root of the project. This project uses the dotenv node module. https://www.npmjs.com/package/dotenv. Your directory should look like this:
![/readmeimages/envfile.png](Env File)
4. Populate your .env file with three variables:
`CLIENT_ID, CLIENT_SECRET` and `CALLBACK_URL`
![/readmeimages/envscreen.png](Env File)

