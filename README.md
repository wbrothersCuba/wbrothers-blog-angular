# Blog Wbrothers

  
This blog is a **responsive frontend SPA** build with **Angular** and **Bootstrap**. Is necesary to register to access to all the funcionality. Each user can edit and delete only their onw post.

*Sections:*
 -Sign Up: for register on the post
 -Sing In: for login previous registration 
 -Create Entry: allows you to create a new post, specifying title, content (with rich text formatting - `froala editor`),  category and an image.
 -Add New Category: adds a category name.
 -My profile: displays the blog entries of the logged in user.
 -Settings:  the sing in user can edit  their data: name, surname, email, biography and user avatar.
 -Read: see any post details.
 -Edit: change any post data of the login user
 -Delete: remove the data  of the login user

The file *global.ts* inside the path:  `..\src\Services\global.ts` contains the url for the backend API.

    export  var  global  = {
     url:  'http://localhost/api-rest-laravel/public/api/',
     ....
 