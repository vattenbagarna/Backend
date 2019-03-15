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
