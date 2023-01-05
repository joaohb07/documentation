
# App API endpoints

To test this app Rest API in local development environment, you can download [***postman***](https://www.postman.com/) and import the collection from `postman-collection.json` file of `backend` branch.

You need also to create a [***postman environment***](https://learning.postman.com/docs/sending-requests/managing-environments/#creating-environments) with the following variables:

- ***`url`:*** `localhost:3000`, port set in `.env` file.
- ***`auth`:*** leave empty, this will be filled when you login or create a user.

## End-point: Create User

This request aims to Create an user, it does the following:

> - receives name, email, password and age;
> - creates an user in DB;
> - generates an authentication token (JSONWebToken).

### Create User Method: POST
>
>`{{url}}/users`
>

## Create User Body (**raw**)

```json
{
    "name": "<your-name>",
    "password": "<your-password>",
    "email": "<your-email>",
    "age": "<your-age>"
}
```

### 🔑 Create User Authentication: noauth

|Param|value|Type|
|---|---|---|

## End-point: Login User

This request aims to Login an user, it does the following:

> - authenticates by email and password;
> - generates an authentication token (JSONWebToken).
>
### Login Method: POST
>
>`{{url}}/users/login`
>
### Login Body (**raw**)

```json
{
    "email": "<your-email>",
    "password": "<your-password>"
}
```

### 🔑 Login Authentication: noauth

|Param|value|Type|
|---|---|---|

## End-point: Logout User

This request aims to Logout the current authenticated user, it does the following:

> - authenticates by user by id, coming from the current authentication token;
> - deletes the current authentication token (JSONWebToken).

### Logout Method: POST

>
>`{{url}}/users/logout`
>

## End-point: Logout All User

This request aims to Logout the current user from all sessions, it does the following:

> - authenticates by user id, coming from the current authentication token;
> - deletes all authentication tokens from this user (JSONWebToken).
>
### Logout All Method: POST

>
>`{{url}}/users/logoutAll`
>

## End-point: Create Task

This request aims to Create an task, it does the following:

> - authenticates the current user;
> - receives description and completed(saves `false` by default if not set) values;
> - creates and save task in DB, with the user ID.
>
### Create Task Method: POST

>
>`{{url}}/tasks`
>

### Create Task Body (**raw**)

```json
{
    "description": "<task-description>",
    "completed": "false"
}
```

### Create Task Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer `<token>` |

## End-point: Read User Profile

This request aims to fetch the current authenticated user data, it returns the following:

>authenticated user data (except sensitive information, such as: avatar, password and auth token(s)).

### Read User Method: GET
>
>`{{url}}/users/me`
>

### Read User Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer `<token>` |

## End-point: Read User By Id

This request aims to fetch user data by user id, it returns the following;

>user data  by id (except sensitive information, such as: avatar, password and auth token(s)).

### Read User Id Method: GET
>
>`{{url}}/users/:id`
>

## End-point: Read Tasks

This request aims to fetch all tasks from the current authenticated user. It can also be filtered by `completed` value.

### Read Tasks Method: GET
>
>`{{url}}/tasks`
>
### Read Tasks Query Params

|Param|value|
|---|---|
|limit|3|
|skip|0|
|completed|false:asc|

## End-point: Read Task By Id

This request aims to fetch user tasks by task id.

### Read Task Id Method: GET
>
>`{{url}}/tasks/:id`
>

## End-point: Update User

This request aims to Update the current authenticated user, it does the following:

> - receives name, email, password and age (all optional);
> - updates the current authenticated user in DB.
>
### Update User Method: PATCH
>
>`{{url}}/users/me`
>
### Update User Body (**raw**)

```json
{
    "name": "<update-user-name>",
    "email":"<update-user-name>" ,
    "password": "<update-user-password>",
    "age": "<update-user-age>"
}
```

## End-point: Update Task

This request aims to Update the current authenticated user task by id, it does the following:

> - receives description and completed (all optional), also task id;
> - updates the task of the current authenticated user in DB.
>
### Update Task Method: PATCH
>
>`{{url}}/tasks/:id`
>
### Update Task Body (**raw**)

```json
{
    "description": "<new task description>",
    "completed": "false"
}
```

## End-point: Delete User

This request aims to delete the current authenticated user, it returns the following:

>authenticated user deleted data (except for sensitive information, such as: avatar, password and auth token(s)).

### Delete User Method: DELETE
>
>`{{url}}/users/me`
>

## End-point: Delete Task

This request aims to delete a task by task id, it returns the following:

>deleted task data.

### Delete Task Method: DELETE
>
>`{{url}}/tasks/:id`
>

## End-point: Upload User Avatar

This request aims to upload current authenticated user avatar image icon, it only accepts `.jpeg`, `.jpg` and `.png` file extensions, also file size limit is up to 1 MB. It saves the file binary data into DB.

### Upload Avatar Method: POST
>
>{{url}}/users/me/avatar
>
### Upload Avatar Body Form Data

|Param|value|Type|
|---|---|---|
|avatar|`<uploaded-file>`|file|

## End-point: Delete User Avatar

This request aims to delete current authenticated user avatar icon image.

### Delete Avatar Method: DELETE
>
>`{{url}}/users/me/avatar`
>

## End-point: Get User Avatar

This request aims to fetch current authenticated user avatar image icon.

### Get Avatar Method: GET
>
>`{{url}}/users/me/avatar`
>

## Reminder

This documentation refers only to `backend` branch, that's because `main` branch version renders html content in the response, not an object.
