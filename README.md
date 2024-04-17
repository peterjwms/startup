# startup - OnBoard

IP address: `44.217.89.189`

Domain name: [`onboard260.click`](https://onboard260.click)

ssh command: `ssh -i ~/keys/production-260.pem ubuntu@onboard260.click`

## Notes
[Notes for this class](notes.md)

## Specification Deliverable

### Elevator pitch
Have you ever beat your friends so badly in a game that you wanted to remember it forever? Or maybe you've wanted to keep track of how much you've improved in a certain game. With the Board Gamers application, you can add your favorite games to your profile, add your high scores and wins/losses, and see high scores on your favorite games from other players. Your information will be stored for each game so that you can track how much you're improving and see who has the highest score!

### Design
![Mockup of the board game web page design, showing login, games, high scores](/cropped_final_design.jpg)

### Key Features
* Secure login over HTTPS
* Ability to search for games
* Ability to add favorite games to profile
* Add scores, wins/losses, and other info to games on your profile
* View information about each game (publisher, year)
* View other users' high scores


### Technologies
I am going to use the required technologies in the following ways.
* **HTML** - Use correct HTML structure for application. Several HTML pages: one for login, one for profile with games, one for games with high scores and notes.
* **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
* **JavaScript** - Provides login, game display, high score display, 
* **Service** - Backend service with endpoints for:
    * login
    * adding games to profile
    * adding high score to game
    * retrieve all high scores for a game
    * (not sure if this fits here) call the BoardGameGeek API for an XML of information related to a game
* **DB/Login** - Store users, games, high scores, other information in database. Register and login users. Credentials securely stored in database. Can't vote unless authenticated.
* **WebSocket** - Each user can see other user's scores for each game.
* **React** - Application ported to use the React web framework.

## HTML Deliverable

For this deliverable I built out the structure of my application using HTML
* **HTML** - Five HTML pages representing login, profile, notifications, search, and adding a score.
* **Links** - Login automatically links to the voter page. Menu is always visible at the top of each page with appropriate links. Additional links in appropriate places for adding games or scores take you to the search and add score forms, respectively.
* **Text** - Appropriate text throughout the site describing possible actions and data.
* **Images** - Example images included on profile and search (will be generated dynamically through API calls in the future)
* **3rd Party Services** - The search page will be populated by calls to the BoardGameGeek API. Current dummy data fills in the results, but will be replaced by dynamically generated data through their API.
* **DB/Login** - Input box and submit button for login. Example database data shown on the profile page.
* **WebSocket** - Notifications page will pull data from actions from other users.


## CSS Deliverable

For this deliverable, I styled my application using CSS and Bootstrap
- DONE - **Prerequisite**: Simon CSS deployed to your production environment
- DONE - **Prerequisite**: A link to your GitHub startup repository prominently displayed on your application's home page
- DONE - **Prerequisite**: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review the [voter app](https://github.com/webprogramming260/startup-example) as an example.
- DONE - **Prerequisite**: At least 10 git commits spread consistently throughout the assignment period.
- Properly styled CSS
  - DONE - 30% Header, footer, and main content body - styled using primarily flexbox for overall layout on each page. Profile is laid out with grid for each game element, inside of the flexbox.
  - DONE - 20% Navigation elements - mix of Bootstrap and custom elements for consistent navbar across all pages.
  - DONE - 10% Responsive to window resizing - Whole application looks good at smallest, largest, and in between sizes from Chrome debugger.
  - DONE - 20% Application elements - main elements (search and profile) are laid out in responsive tables; buttons and input forms are Bootstrap.
  - DONE - 10% Application text content - Text is appropriately sized and styled, using default sans serif.
  - DONE - 10% Application images - example images appropriately resize in the search and profile pages.

## JS Deliverable
- DONE - **Prerequisite**: Simon JavaScript deployed to your production environment
- DONE - **Prerequisite**: A link to your GitHub startup repository prominently displayed on your application's home page
- DONE - **Prerequisite**: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review the [voter app](https://github.com/webprogramming260/startup-example) as an example.
- DONE - **Prerequisite**: At least 10 git commits spread consistently throughout the assignment period.
- Significant use of JavaScript to create a viable working application
  - DONE - 20% JavaScript support for future login. - JS that stores and displays the username used to login
  - 20% JavaScript support for future database data. - JS that allows user to add games to profile, and scores for added games; all stored in localStorage currently, and injected into the DOM dynamically
  - 20% JavaScript support for future WebSocket. - realtime data mocked with random() and setInterval on the notifications page (Activity) showing games and scores that fake users recently added 
  - 40% JavaScript support for your application's functionality. - overall functionality for JS with adding games, scores, searching for games, viewing dynamically updated profile

## Service Deliverable
- DONE **Prerequisite**: Simon Service deployed to your production environment
- DONE **Prerequisite**: A link to your GitHub startup repository prominently displayed on your application's home page
- DONE **Prerequisite**: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review the [voter app](https://github.com/webprogramming260/startup-example) as an example.
- DONE **Prerequisite**: At least 10 git commits spread consistently throughout the assignment period.
- Backend web service support and interaction
  - 40% - Create an HTTP service using Node.js and Express - HTTP service created with node.js and express
  - 10% - Frontend served up using Express static middleware - frontend served up using express
  - 10% - Your frontend calls third party service endpoints - search.js calls boardgamegeek endpoints to search and get game data
  - 20% - Your backend provides service endpoints - index.js provides service endpoints to add and get games and scores
  - 20% - Your frontend calls your service endpoints - frontend code calls service endpoints, especially for the places where it was previously pulling from localStorage

## Login Deliverable
- DONE - **Prerequisite**: Simon Login deployed to your production environment with your dbConfig.json credentials
- DONE - **Prerequisite**: A link to your GitHub startup repository prominently displayed on your application's home page
- DONE - **Prerequisite**: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review the [voter app](https://github.com/webprogramming260/startup-example) as an example.
- DONE - **Prerequisite**: At least 10 git commits spread consistently throughout the assignment period.
- Application authentication and authorization
  - 20% - Supports new user registration - new user registration allowed and stored
  - 20% - Supports existing user authentication - users authenticated from db
  - 20% - Stores application data in MongoDB - all application data (users, games, scores) stored in MongoDB
  - 20% - Stores and retrieves credentials in MongoDB - credentials stored and retrieved from MongoDB, hashed
  - 20% - Restricts application functionality based upon authentication - auth cookie used, also index nav bar limited