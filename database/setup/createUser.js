//use <database>;
db.createUser(
  {
    user: "userReadWrite",
    pwd: "<password>",
    roles: [ { role: "readWrite", db: "<database>" } ]
  }
)
