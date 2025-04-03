# CS260 - Love Notes

## Elevator Pitch
Have you ever forgotten an important date?  Anniversary, birthday, or something important to someone you care about?  What if you could take just a few minutes to fill out a list of people you want reminders for.  For each person, you fill out a list of dates for what is important about that person.  Then on those dates, you get a reminder to tell them how much that day means to you.  Better yet, you get a sample message that you can click to forward or you can edit or replace it before sending it to that important someone.  You have a reminder each time that day comes around with a message sent from you to them and you have now been reminded yourself for in person conversations.  

## Key Features
- Login and Information Pages to include the following:
- List of important people and their contact email
- List of important dates specific to each important person
- Selection of date types assigned with each date (birthday, anniversary, etc)
- List of pre-written messages for each date type

## Description of Technology Implementation Plan
1. HTML - Uses correct HTML structure for application. Four HTML pages. One for registration, one for login, one for your list of people and a fourth listing dates and date types for each person.
2. CSS - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
3. JavaScript - Provides login, add people, add dates for each person, message choice display for date types, backend endpoint calls.
4. React - Single page application with views componentized and reactive to user's actions.
5. Service - Backend service with endpoints for:
   - retrieving list of saved people
   - retrieving saved dates and selections for each saved person
   - adding new people
   - displayed a random dog picture using the https://dog.ceo/api/breeds/image/random service.
6. DB/Login - Store users, people, dates, date types, and messages in database. Register and login users. Credentials securely stored in database.
7. WebSocket - On the morning of each date saved, send a suggested message to that user corresponding to the date's type the the user may forward or modify and then forward.

## Sketches
![Register Page](https://github.com/user-attachments/assets/ed902552-b87a-44da-8117-6d6a684b0bca)
![Login Page](https://github.com/user-attachments/assets/71590970-1379-4200-b0d6-fd3648a6f7a7)
![My Important People](https://github.com/user-attachments/assets/875a3425-48bc-481e-b8fc-44ee7beea450)
![Important Dates](https://github.com/user-attachments/assets/00864846-06a6-4841-8e1d-a169cd14ac60)

## Notes
1. ssh -i /path/name.pem ubuntu@3.88.118.204 to connect to the site viA SSH
2. Note that your elastic IP address is allocated until your release it, not until you terminate your instance. So make sure you release it when you no longer need it. Otherwise you will get a nasty $3 bill every month.
3. https://github.com/webprogramming260/.github/blob/main/profile/webServers/startupAWS/startupAWS.md
4. https://github.com/webprogramming260/.github/blob/main/profile/webServers/amazonWebServicesEc2/amazonWebServicesEc2.md
5. https://github.com/webprogramming260/.github/blob/main/profile/webServers/amazonWebServicesRoute53/amazonWebServicesRoute53.md
6. https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md
7. simon.html
   - https://www.youtube.com/watch?v=zg7eDNRMnWA
   - https://github.com/webprogramming260/.github/blob/main/profile/simon/simonHtml/simonHtml.md

## Notes Specific to the html Assignment
1. Added the link for this github repository in the footer of each file
2. Added index.html, createAccount.html, people.html and dates.html files
3. ./deployFiles.sh -k /path/name.pem -h lovenotes.click -s startup is the method for uploading the files to the production site

## Links Specific to the CSS Assignment
1. https://github.com/webprogramming260/.github/blob/main/profile/css/startupCss/startupCss.md
2. https://github.com/webprogramming260/.github/blob/main/profile/css/introduction/introduction.md
3. https://github.com/webprogramming260/.github/blob/main/profile/css/selectors/selectors.md
4. https://github.com/webprogramming260/.github/blob/main/profile/css/declarations/declarations.md
5. https://github.com/webprogramming260/.github/blob/main/profile/css/fonts/fonts.md
6. https://github.com/webprogramming260/.github/blob/main/profile/css/animation/animation.md
7. https://github.com/webprogramming260/.github/blob/main/profile/css/practice/practice.md
8. https://github.com/webprogramming260/.github/blob/main/profile/css/responsive/responsive.md
9. https://github.com/webprogramming260/.github/blob/main/profile/css/grid/grid.md
10. https://github.com/webprogramming260/.github/blob/main/profile/css/flexbox/flexbox.md
11. https://github.com/webprogramming260/.github/blob/main/profile/css/debuggingCss/debuggingCss.md
12. https://github.com/webprogramming260/.github/blob/main/profile/css/frameworks/frameworks.md
13. https://github.com/webprogramming260/.github/blob/main/profile/simon/simonCss/simonCss.md

## Notes Specific to the CSS Assignment
1. Added CSS formatting to the login and create account pages.
  - This included buttons, tables, and formatted text boxes.
2. Started CSS formatting on the people and dates pages.
  - This included buttons, header, and titles.
3. Added the main.css file
4. On the dates.html page, the word "Christmas" is a placeholder for the web socket.
5. On the dates.html page, the Christmas and New Years important dates are placeholders for what the database stores and serves.
6. On the people.html page, the Jane Doe record is a placeholder for what the database stores and serves.
7. On the people.html page, the words, "Tyrannosaurus Wrecks" are the placeholder for the 3rd party API.
8. Added love_notes_jpg logo at the bottom of each page in the footer and gave it a border in main.css
9. Could not ever get the hide-on-mobile to actually work which is why I added #8, love_notes_jpg logo to show some CSS formatting of an image.
10. Added Bootstrap to my package

## Links Specific to the React1 Assignment
1. https://www.youtube.com/watch?v=-Gv27DPUPbQ
2. https://learn.cs260.click/page/webFrameworks/startupReact/startupReactP1_md
3. https://github.com/webprogramming260/.github/blob/main/profile/simon/simonReact/simonReactP1.md

## Notes Specific to the React Assignment
1. Installed and configured Vite
2. Reorganized the code into directories
3. Converted to React Bootstrap
4. Created all the jsx files
5. Added routes and navigation
6. Added all the React components to to all four pages

## Notes Specific to the React2 Assignment
1. Added the use of local storage for the username and password on the login page
2. Added React.useState variables that can be saved and passed around to the login and create account pages
3. Set conditional login button availability using the authenticated, unauthenticated and authstate libraries
4. Set conditional creat account availability to require a name, username, and matching password / confirm password
5. Added useEffect for both dates and people pages.
6. Changed the people and dates pages to use tables and added check boxes that allow you to select a person on the people page and that will redirect you to the dates page with that person's name as a filterable property.
7. Fixed a bug in the useEffect that was causing it to cycle faster and faster until my memory got all used up by adding ,[state] between the last two curly braces of the useEffect function.
8. Added the ability to delete with a button either people or dates row by row.
9. Added a button for Del and Dates on the people table and one for Del on the dates table.
10. Made it so that if an Important Person is deleted, so are all of their associated dates.
11. Added filtering so that important people and thus by association, their important dates are filtered to only display if they were entered by the logged in user.
12.  Everything is done.  There is a glitch where every once in a while, on login, the userName passes to the people page as null or undefined.  This is a problem because it does not display the associated people and thus their associated dates as it should.
13. I added functionality to check username and password at login for actual values stored in the localStorage.  If they don't exist then a message displays saying wrong username or password.  Try again.
14. I added functionality to check for an existing username as a conflict when creating a new account.
15. This finishes everything so that the React2 homework assignment is complete


## Notes Specific to the Service Assignment
1. Added the service folder, installed npm in it and added the index.js file.  For now I just copied the one from Simon and will be modifying it as I go.
2.  Currently working on the useEffect lines in People and Dates.
