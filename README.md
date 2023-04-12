# Note-Taking-App
This is a simple note taking application built using Angular, NodeJS, and SQL. The application allows users to create, view, edit, and delete notes.

>**Warning**<br>
>This code is designed to be run using Docker. To deploy the application, you will need to have Docker installed on your machine and follow the instructions provided in the documentation. Although the code may be able to run without docker, it is only to show how the application is communicating with the backend service.


## Instructions

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Run the following command
```
docker-compose up -d
```
4. The application should now be running at `http://localhost:3000`.<br> To use the application, open a web browser and navigate to

```
http://localhost:3000
```

## Usage
### Creating Notes
To create a new note, click on the "Add Note" button on the main page. This will open a dialog page, where you can enter a title and conten in a note. Once you are done, click on the "Save" button to save the note.

### Viewing a Note
To view an existing note, click on the title of the note or use the eye icon. This will take you to the note view page, where you can read the note and edit or delete it if necessary. 

### Update/Delete a Note
You can either click on a note and have the option to delete/edit it or you can use the icons provided on the main page to do what you desire.

