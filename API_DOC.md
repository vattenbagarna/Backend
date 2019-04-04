# API Documentation
This is the documentation for the backend system and it's API routes.

# Table Of Contents
* Routes requiring tokens
* Objects
    * All Objects
    * Find Object By Type
* Users
    * Signup
    * Login
    * Change password
    * Request password reset
    * Password Reset
* Admin
    * User
    * Create account

## Routes requiring tokens
Some routes requires the user to be authenticated. This can be done by logging in
and aquiring a token. that token should then be sent with each request that needs it
as a query parameter after the url as such: `?token=YOURTOKENHERE`.

## Objects
The objects are reachable under the `/obj/` route.

### All Objects
Fetch all items with a `GET` Request to the route:
```
/obj/all
```
### Find Object By Type
Fetch items of a specific category based on the `Namn` field in the database with a `GET` Request on the route:
```
/obj/type/<YourTypeHere>
```
where `<YourTypeHere>` is the type you want to find items for.

## Users
User routes can be found under the `/acc/` route.

### Signup
This route is temporary and should be dissabled once the system is ready to deploy. System should not
allow open signup. To signup send a `POST`request to `/acc/signup`. Submit a html-form
with the parameters `username`, `password` and `isAdmin`

### Login
Allows the user to login and returns a token for the client to use as authentication.
Send a `POST` request to `/acc/login` with the form fields `username` and `password`.

### Change password
Allows the user to change the password by sending a `POST` request to `/acc/changepassword`
with the form data `username`, `password`, `newPassword` and `confirmNewPassword`.

### Request password reset
The user can use this to reset a forgotten password. Sends a reset token to the users
email. Send a `POST` request to `/acc/requestreset` with the form data of `username`

### Password reset
With the one time reset token from the requestreset route the user can set a new password.
Send a `POST` request to `/acc/passwordreset` with the form data for `username`, `oneTimeKey`,
`newPassword` and `confirmNewPassword`

## Admin
This handles all the admin routes and cannot be used by non-admins. All routes are
available over at `/admin/`

### user
This routes shows basic info about the user making the request. Made to test if
user is an admin. Access this by sending a `GET` request to `/admin/user`.

### Create account
When a new account is needed for a user an admin can create one. A logged in admin
can send a `POST` requset with the form data `username` containing the new users **email** and
`isAdmin` if the new user should be admin.
