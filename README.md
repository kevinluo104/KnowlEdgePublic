
# KnowlEdge

KnowlEdge is an online course management system built using the MERN stack, KnowlEdge allows users to create accounts, enroll in courses, access course information, create tasks/events on a calendar, create flashcards for practicing terminology, edit profiles, and view course information.


# Project Requirements

**Minimal Requirements**

1.  :white_check_mark: **Login/Signup page:** new users will have the option to create an
                        account by providing a username, password, and email address. They
                        will also indicate if they are an instructor. This
                        information allows the web application to load the relevant user
                        information and features. Existing users can simply log in to access
                        their accounts.

2. :white_check_mark: **Student Dashboard:** upon successful login, a student user will be
                        directed to a landing page where they will be able to view content
                        with links in order to access the web application content. These
                        links include:
   * links to the respective course pages 

   * a profile picture with links to edit their personal information. 
     
   * a navigation bar with links to logout, access the calendar, the course enrollment feature and study sets. 

4.  :white_check_mark: **Calendar:** a user will be able to access a calendar so they can
                       stay organized by:

    -   adding, editing, and removing custom events and tasks. 

    -   viewing upcoming due dates for assignments, exam schedules, lectures, and labs. 

    -   publishing course specific events or tasks to the calendars of students enrolled in their courses (for instructors only). 

5. :white_check_mark: **Student Course Page View:**  a student user will be able to view a course page in order to access course content. 

6. :white_check_mark: **Student Profile Page:** a student user will be able to view their own student profile, which has their profile picture, name, faculty,
                        major, contact info, and an about me section. Students also have the ability to add a preferred name if they wish, as well as edit their contact info and
                        about me section.

**Standard Requirements**

1.  :white_check_mark: **Student Dashboard:**  upon successful login, a student user will
                        be directed to a landing page where they will be able to view
                        everything listed in the minimal requirements as well as:
                    
    -   a search bar to browse and enroll in courses 

    -   a List of the notes and study sets they have made as well as
        links to views so they can create new study sets or notes.
        
    -   a list of courses the user is enrolled in, today's events and recent announcements for each course.    

2.  :white_check_mark: **Study Sets Edit View:** 

    -   A student can create flashcard sets to practice the course content.
    
    -   A student can access course specific flashcards from the course page.
        
    -   A student can practice course content with the writing practice and flascard practice modes.

4. :white_check_mark: **Student Course Page View:**

    -   Students are able to access class specific announcements, their own personalized notes and personalized study sets.

    -   Students will are able to access course specific content posted by instructors.

    -   Students will be able to see other users enrolled in the course through the class list feature.

5.  :white_check_mark: **Comment sections:**

    -   Students will be able to comment on instructor published content for clarification purposes in comment sections beneath course content.

6.   :white_check_mark: **Announcement section:** Students and instructors will be able to create announcements that are visible to other users and use a search bar to look up announcements.


**Stretch Requirements**

1. :white_check_mark: **Live chat:** users will be able to interact with each other in private or group channels.

2. :white_check_mark: **Instructor Course Page View:** an instructor user will be able to
                        view a course page similar to the student course page in order to create, edit and access course content.
   
4. :white_check_mark: **Instructor Profile Page View:** an instructor will be able to view their
                        own instructor profile, which has their profile picture, name, faculty,
                        field of study, contact info, and an about me section. Instructors also have the ability
                        to add a preferred name if they wish, as well as edit their contact info and
                        about me section.
   
8. :white_check_mark: **Notes Edit View:** a student can create, edit, and save notes for each course. 
    
5. :white_check_mark: **Instructor Dashboard:** upon successful login, an instructor user
                        will be directed to a landing page where they will be able to view
                        links in order to access the web application content. These links
                        include:
                    
    -   links to the respective course pages for courses they are
        currently teaching.

    -   a profile picture with links to modify settings and edit their
        personal information.

    -   a navigation bar with links to access the calendar, the courses
        the instructor is teaching, grades and a message inbox.                
    
6. :x: **Email notifications:** new users will receive email confirmation
            of their successful account creation along with a link/code to
            verify their new account.
   
7. :x: **Study Sets Comments:** students will be able to comment and upvote student published content so that helpful content can be placed in a way that more students will easily see it.

**Task Breakdown**

-   **Student Dashboard:** 

    -   Create a Navigation Bar component with links to the dashboard,
        calendar, study sets, notes, and messages. Each link opens a
        dropdown menu to more specific parts of the respective page.

    -   Create a Course Cards component with a short summary of each
        course and a link to the course page.

    -   Create a  Student Information/Profile Card and user settings
        modal to allow the user to edit the personal information
        displayed including name, student id, year standing and faculty.

    -   Create a Study sets and Notes cards section where  the title of
        the most recent study sets or notes created are displayed with
        links and there is a see more... link to view all the study
        sets/ notes.

    -   Set up a database with relevant information including the user's
        personal details, the courses the student users are enrolled in
        and those that instructor users teach, etc.

    -   Set up endpoints to fetch user information and course
        information.

-   **Calendar**

    - Calendar View
        - Display a calendar with day, week, month views.
        - View course specific due dates.
        - Display lectures, labs and other instructor published course events on the calendar.
        - Display important due dates for the semester and individual courses on the calendar such as add/drop deadlines, assignment due dates, exam schedules etc.
    - Add buttons and menus to add, edit and remove tasks or events for the calendar and display them on the calendar as well as in a collapsable task pane.
    - Set up endpoints to fetch information relating to user specific tasks, events and course related tasks, events.
    - Set up the database to persist all tasks or events added to the calendar.


# Usage of Tech from Units 1-5 in the Project

**Unit 1: HTML, CSS, JavaScript**

We used JavaScript throughout the entire project, for both the frontend and backend. For styling, we used a combination of styled components and CSS files, together with jsx,
which is a combination of all HTML, CSS, and JavaScript.
          
**Unit 2: React & Redux**

We used React to make our frontend, using the benefits of re-usuable components that React brings, keeping repeated code to a minimum. We also used redux and the store to maintain state in our application and access state throughout the entire project in different components.
          
**Unit 3: Node & Express**

A Node.js backend was used, in conjunction with Express to make our server and to communicate the front end with the backend. A RESTful API was made using the Express framework.
         
**Unit 4: MongoDB**

We used MongoDB to store the data in our application, such as announcements, images, course content (text), users, studysets, and more. In our server, we created Mongoose objects
for easy access and organization of MongoDB objects in our application. 
          
**Unit 5: Release Engineering**

We have deployed our application using Render, separating frontend and backend while doing so. Both the frontend and backend is now hosted on Render, and the endpoints now have
to be directed to server hosted on Render now. 


# Above and Beyond Functionality

KnowlEdge truly stands out by going beyond the outlined requirements and incorporating an array of impressive features.

The student dashboard showcases a thoughtfully designed Navigation Bar component, streamlining user access to specific sections such as course enrollment and personal information editing. The calendar feature excels by offering diverse views, course-specific due dates, and even instructor-published events. The collapsible task panes and data endpoints indicate a solid grasp of data management.

The Study Sets Edit View offers valuable practice modes, promoting active learning, while the Student Course Page View thoughtfully integrates personalized content. The Comment sections and Announcement feature add to the overall user engagement. The Stretch Requirements are thoughtfully executed, especially the Live Chat feature, which highlights the project's technical prowess.

In conclusion, this project goes beyond expectations by thoughtfully integrating advanced features that cater to a variety of user needs. Its user-friendly design, functional enhancements, and technical implementations showcase an exceptional level of dedication and skill.

# Next Steps

The initial focus involves realizing outstanding stretch goals like email verification for new users and adding comment sections to study materials. Future plans include calendar synchronization with Google Calendar and event sharing. Subsequently, efforts will be directed towards refining site performance and reliability through database and code optimizations.

# Contributions

**Loay Al Jahwari**

I was responsible for developing the student dashboard, which involved creating key components such as the navbar, and adding features like course enrollment. Additionally, I created a comprehensive comment section for the resource page, incorporating functionalities such as upvoting, downvoting, replying, and sorting. Moreover, I played an active role in implementing the design across different screens, ensuring a consistent and appealing user interface. Furthermore, I implemented in-app messaging functionality using Firebase.

**Kevin Luo**

Responsible for the development of major features, such as the class list (students in the class), student profile, and course resource pages. Integrated diverse input formats for the resource pages, each utilizing distinct backend storage methodologies tailored to their specific types, rendering based on the type of user logged in. Collaboratively implemented the Express middleware router with RESTful endpoints and MongoDB models to allow seamless communication between the frontend, backend, and database.

**Johnson Lu**

Contributed to the development of key features, including the integration of a notes page, course page (which includes an instructor and student view), and an announcement page. Additionally, incorporated logic that discriminates between logged-in instructors and students for course page and announcement page, thereby tailoring content access and modification privileges according to who is logged in. Lastly, collaboratively implemented the Express middleware router to facilitate communication between MongoDB and the frontend. 

**Kaiyuan Chen**

Implemented the initial study sets listing page that allows users to create study sets and add flashcards to them. This endeavor involved incorporating input functions and card displays, and rectifying various styling and routing challenges. Created the Flashcard Practice and Writing practice modes for users to practice the course content with instant feedback and results.

**Abigail Moraes**

Made significant contributions to the project, designing essential components like the Calendar, Student Dashboard, and Student Course Page through Figma. Implemented event management within the calendar and integrated Firebase authentication for seamless sign-up and login processes. Played a pivotal role in deploying the application and enforcing endpoint security using Firebase tokens.


# Special Use Cases (for instructors/graders)
Most of the use cases in our application are intuitive, however some of the them require special access (e.g. instructor login credentials), or are easy to miss. In addition to the basic functionalities of our app,
here are some highlighted use cases that require some extra information:

**Upload/Viewing of course documents (resources)**

To perform this use case, the user would need to login as an instructor, as only instructors have access to upload documents. To login as an instructor, run the app from the login screen and click on the "Login" button, and enter 
the credentials which will be provided through private message. Next, click on any course card, and then any module, which will bring down a drop-down menu of submodules. Click on a submodule, and that should bring you to the file upload page.
From the file upload page, instructors are given 3 options (PDF, image, text) to upload, and need to press the "Display Current Mode To Students" button to set the type of resource that will be displayed to the student. After uploading,
log out and log back in with a normal (student) account and head over to the course that you uploaded the resource to. The resource should be available on the screen to the student. 

**Chat Feature**

The chat feature is accessed by clicking on the "Messages" button on the navbar, or on the blue text message icon on the bottom right of the page. To create a message with someone, click on the magnifying glass, and type the name of the student you want to message. After sending a message to that student, you should log into the account of the student that received the message to view the receipt of the message. This can be done with one browser window in normal mode, and one in incognito mode.
You can also observe the live chat feature with the 2 user setup, as messages are displayed on the other user as soon as a message is sent over. Channels can be created by clicking on the 3 dots, which can be accessed by every other user in the course,
by searching for the channel name after pressing the magnifying glass icon.

**Calendar**

To create a new event, click on the "+" button of the left side of the screen and input the desired fields. For the course name, please enter in exactly how the course is named. (e.g. enter CPSC 455) Events created for the same day will appear
on the course card on the student dashboard, under "Today". Marking the event public displays the event for ALL users' calendar, as long as they are registered for the course. Setting the event private will result in the event being shown to
ONLY the instructors. Tasks can be created by clicking on the "+" button and clicking on the "Task" button on the pop-up. The difference between Task and Event are that Tasks are able to be checked off and completed. To check off or uncheck a task,
click on the checkmark on the right side of the calendar, which should give you options to check or uncheck each task. 

**Announcements**

To view/create announcements, click on a course which the student is enrolled into on the main student dashboard. Then, click on see more under the announcement section. Then click the Post Announcement button and fill in the fields and click submit. Afterwards the user should be able to see the new announcements. If the user is a student, they will be able to have the option to delete their own annoucements. If the user is an instructor, they will have the option to delete any announcements posted. To view all the announcements of the courses the user is enrolled in, navigate to the dashboard (first page the user sees upon login) and then click on the bell icon on the top right.

**User Profile**

To view/edit user profile, click on the pencil icon to the right of the student name on the main student dashboard. 

**Enroll/De-register in Courses**

To enroll in other courses, press the courses button in the nav bar, and press "Enroll". To de-register from courses, press the courses button in the nav bar, then press the X button next to the course that you want to delete.

**Course Page**

To edit the course page, the user must be on an instructor account. Then the instructor will be able to click on "add module" and type in the name of the module to create a new module. Then after creating a module, the user will have the option to either click the blue + icon to add a new submodule or click the red trash bin icon to delete the module. By clicking the + icon, the user will be able to input a name for the submodule and by submitting, a new submodule will appear under the module. For the submodule, the user will also see a red icon which they can click to remove the submodule.

**Notes Page**

To add a new page, the user can click the + icon next to the Notes heading on the top left. Then afterwards, the user can fill in the fields and by clicking enter individually in each field after typing, the note will be saved.


# Prototypes

**Student Dashboard**

<img src="/media/studentdashboard.png" width="600">

**Student Course Page**

<img src="/media/studentcoursepage.png" width="600">

**Calendar View**

<img src="/media/calendar.png" width="600">

