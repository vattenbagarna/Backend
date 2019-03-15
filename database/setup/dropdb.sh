#! /bin/bash

data="use baga \n db.Objects.drop() \n db.Projects.drop() \n"
echo -e "$data" | mongo -u baga -p baga admin
users="db.dropAllUsers()"
echo -e "$users" | mongo -u admin -p admin admin
