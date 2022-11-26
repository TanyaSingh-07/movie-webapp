# Fasal (Wolkus Technology Solutions Private Limited)

Create a movie library web application with the below features using any tech stack.

## Requirements

- The application must have user authentication ( Sign In/ Sign Up )

- After logging in users will be navigated to the home screen where they should see a search option where they can search movies and see details of those movies.

- They can create a list of movies by adding the movies to lists. ( Similar to youtube playlists ). On the home page, different movie lists created by that user will be displayed.

- These lists can be either public ( anyone with a link to the list can see this ) or private ( only the person who created can see this list )

- You can use OMDB API for the movie search option.

- The Search & List page should have a nice layout, take inspiration from other websites/applications.

- Include Steps to run ( Readme file ) in the project as well.

- You must host their projects online and provide working links to the application as well as code. ( e.g. Netlify, Vercel, Heroku, JSBin etc. )

## Getting Started

1. You must have `Python` installed on your system.
2. Visit `https://www.omdbapi.com/apikey.aspx` and get your API KEY
3. Download the code and unzip it
4. In your terminal, `cd` into the `fasal-movies-library-master` directory.
5. Run `pip install -r requirements.txt` to download all the dependencies.
6. Run `python manage.py makemigrations movies` to make migrations for the `movies` app.
7. Run `python manage.py migrate` to apply migrations to your database.
8. Navigate to movies->static->movies->index.js and on line 45 replace 'API_KEY' with your API KEY.
9. Run `python manage.py runserver` to start the Django web server.
10. Visit the website in your browser.

## Help

To visit a public movie-list:

- Replace `username` with the profile's 'username' you want to visit:
  - https://fasal-movies-library.herokuapp.com/profile/username/

## Heroku

Website: [fasal-movies-library](https://fasal-movies-library.herokuapp.com/)
