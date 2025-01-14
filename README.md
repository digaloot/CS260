# CS260 - Love Notes

## Elevator Pitch
Have you ever forgotten an important date?  Anniversary, birthday, or something important to someone you care about?  What if you could take just a few minutes to fill out a list of people you want reminders for.  For each person, you fill out a list of dates for what is important about that person.  Then on those dates, you get a reminder to tell them how much that day means to you.  Better yet, you get a sample message that you can click to forward or you can edit or replace it before sending it to that important someone.  You have a reminder each time that day comes around with a message sent from you to them and you have now been reminded yourself for in person conversations.  

## Key Features
Login and Information Pages to include the following:
List of important people and their contact email
List of important dates specific to each important person
Selection of date types assigned with each date (birthday, anniversary, etc)
List of pre-written messages for each date type

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
7. WebSocket - On the morning of each date saved, send a suggested message to that user corresponding to the date's type the the user forward or modify and then forward.

## Sketches
![Register Page](https://github.com/user-attachments/assets/ed902552-b87a-44da-8117-6d6a684b0bca)
![Login Page](https://github.com/user-attachments/assets/71590970-1379-4200-b0d6-fd3648a6f7a7)
![My Important People](https://github.com/user-attachments/assets/875a3425-48bc-481e-b8fc-44ee7beea450)
![Important Dates](https://github.com/user-attachments/assets/00864846-06a6-4841-8e1d-a169cd14ac60)

