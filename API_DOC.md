# API Documentation
This is the documentation for the backend system and it's API routes.

# Table Of Contents
* Objects
    * All Objects
    * Find Object By Type

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

## Projects
The projects are reachable under the `/proj/` route.

### Get All Projects
Fetch all projects with a `GET` Request to the route:
```
/proj/all/<YourUserIdHere>
```
Where `<YourUserIdHere>` is your userId.

### Get Project By Id
Fetch a specific project with a `GET` Request to the route:
```
/proj/id/<ProjectIdHere>/<YourUserIdHere>
```
Where `<YourUserIdHere>` is your userId,
and `<ProjectIdHere>` is the projectId.

### Get Project Data By Id
Fetch object `data` for the map from project with a `GET` Request to the route:
```
/proj/data/<ProjectIdHere>/<YourUserIdHere>
```
Where `<YourUserIdHere>` is your userId,
and `<ProjectIdHere>` is the projectId.

### Get Project Info By Id
Fetch basic project infromation from a project with a `GET` Request to the route:
```
/proj/info/<ProjectIdHere>/<YourUserIdHere>
```
Where `<YourUserIdHere>` is your userId,
and `<ProjectIdHere>` is the projectId.

### Create New Project
Insert new project with a `POST` Request with `name` and `version` as values to the route:
```
/proj/insert/<YourUserIdHere>
```
Where `<YourUserIdHere>` is your userId.

### Delete Project By Id
Delete a project with a `GET` Request to the route:
```
/proj/delete/<ProjectIdHere>/<YourUserIdHere>
```
Where `<YourUserIdHere>` is your userId,
and `<ProjectIdHere>` is the projectId.


### Update Project Info
Update basic project infromation with a `POST` Request with `name` and `version` as values to the route:
```
/proj/update/info/<ProjectIdHere>/<YourUserIdHere>
```
Where `<YourUserIdHere>` is your userId,
and `<ProjectIdHere>` is the projectId.

### Update Project Data
Update/Save object data for the map with a `POST` Request with an `Array` to the route:
```
/proj/update/data/<ProjectIdHere>/<YourUserIdHere>
```
Where `<YourUserIdHere>` is your userId,
and `<ProjectIdHere>` is the projectId.

