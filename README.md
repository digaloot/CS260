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
