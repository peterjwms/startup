# startup - OnBoard

IP address: `44.217.89.189`

Domain name: `onboard260.click`

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

