# Workfully Technical Test

First of all, thanks for your time and the opportunity to apply to be part of the Workfully team!

Let's get some things out of the way first:

- Did I try to implement some things I haven't used before? Yes
- Was it a good idea to implement things I'm not sure will work? Probably not...
- Was it worth it? Yes, and it was fun as well. I take coding challenges as opportunities to try out some new stuff.

## The application

This is a simple application that consists of an API (backend) that was built with NodeJS and Express and frontend app that consumes the API that was built using NextJS (v13).

The client side has a Home page that has links to the Register and Login pages if the user is not logged in, and links to My Profile pages and log out if the user is already signed in.
The My Profile page is a protected route that is only displayed if the user is logged in and it only shows the user's own data.
The API has `auth` endpoints so users can register, login and logout; and `users` endpoints that provide CRUD functionality and a protected `user profile` endpoint.
All the user endpoints check for authentication and authorization (to view own profile) through the use of middlewares and handle errors by throwing the error to the `errorHandler` middleware.

The API endpoints available are the following:

```
GET /
GET /api/health-check
POST /api/register
POST /api/login
POST /api/logout
GET /api/users
POST /api/users
GET /api/:id
GET /api/:id/profile
PATCH /api/:id
DELETE / api/:id
```

## Building the app

As stated before, I take coding challenges as opportunities to try out new stuff, whether it is new technologies or new design patterns.
For this application I wanted to test the new NextJS App router which has some interesting new possibilities for nested layouts and templates as well as the `pnpm` package manager. It looks promising as I was able to see a reduction of build times and a much smaller `node_modules` foot print.
My first intention was to make this project a mono-repo and use tRPC as the connection layer between the client and the backend to take advantage of having type safety both in the client and the server and defined schemas that could be consume by both.
I decided against it since I was already trying some new stuff and wanted to have a working application by the deadline.

Although there are still many thing to be improved, I think most of the goals were achieved and the app working (mostly) as expected.

## Things that need improving

- Better error handling
- Logging to external services for monitoring
- Refactor of client application (better separation of functionality and UI and the Session Context is kind of messy right now).
- More exhaustive testing (the test themselve are passing but throwing errors 🫢)

## Running the application

Ideally:

1. Clone this repository
2. Run command: `run npm hireEdy` (we can change the name of the command if you prefer).

- This command uses yarn in the background so you should have that installed.

Manually:

1. Clone repo
2. `cd` into backend and run yarn/pnpm install
3. Rename the backend `.env.example` to `.env` (I usually leave a `.env.example` file to indicate the ENV variables needed and no, I don't usually leave the actual values here)
4. Run yarn/pnpm dev

5. `cd` into frontend and run yarn/pnpm install
6. Rename the frontend `.env.example` to `.env.local`
7. Run yarn/pnpm dev
