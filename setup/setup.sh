#!/bin/bash

echo 'Name for admin:'
read name
echo 'Password:'
read -s pass

admin="db.createUser(
   {
     user: '$name',
     pwd: '$pass',
     roles: [ { role: 'userAdminAnyDatabase', db: 'admin' } ]
  }
)"

echo 'Name for user:'
read name
echo 'Password:'
read -s pass
echo 'Which database:'
read database

user="db.createUser(
   {
     user: '$name',
     pwd: '$pass',
     roles: [ { role: 'readWrite', db: '$database' } ]
  }
)"

collections=`cat createCollections.js`
objects=`cat insertObjects.js`

login="use $database \n $collections \n $objects \n $user \n use admin \n $admin \n exit"

echo -e "$login" | mongo

sudo cp ../config/mongodb.conf /etc/mongodb.conf
sudo service mongodb restart
