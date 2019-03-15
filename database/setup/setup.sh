#!/bin/bash

echo 'Name for admin:'
read adminName
echo 'Password:'
read -s adminPw

admin="db.createUser(
   {
     user: '$adminName',
     pwd: '$adminPW',
     roles: [ { role: 'userAdminAnyDatabase', db: 'admin' } ]
  }
)"

echo 'Name for user:'
read userName
echo 'Password:'
read -s userPw

echo 'Which database:'
read database

user="db.createUser(
   {
     user: '$userName',
     pwd: '$userPw',
     roles: [ { role: 'readWrite', db: '$database' } ]
  }
)"

collections=`cat createCollections.js`
objects=`cat insertObjects.js`

login="use baga \n $collections \n $objects \n use admin \n $admin \n $user \n exit"

echo -e "$login" | mongo

sudo cp mongodb.conf /etc/mongodb.conf
sudo service mongodb restart
