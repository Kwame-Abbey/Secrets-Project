This repository is just for the practice of authentication and security. The practice was divided into six (6) levels where each preceeding level adds more security advantages over the former. 
Here, a home page was rendered were a user can signup or login( if he had already registered) to get access to a secret.

1. The first level basically deals with storing user's username and password to a database.  In this case, a mongoose database was used to store user's data.

2. Level 2 involved encryption. In this level, the mongoose-encryption package was used to provide some encryption for the user's password generated. This level also provided some vulnerabilities hence the need for a more secure option.

3. Hashing was tackled at level with the help of the md5 package. The password of the user then hashed safely but one disadvantage of this level of hashing wa show the md5 package genarates the same encrypted message fo r the same string of characters with makes hacking of users of same password very likely the moment one user's get  comprehended.

4. This fourth level basically dealt with the main disadvantage of level 3 by introducing Salting in addition to the hashing done in level 3. Salting adds a randomly generated string of characters to the already generated hash in level 3 to make the user's password more difficult to crack.

5. The fifth level mainly involved the use of the passport, passport-local, passport-local-mongoose and express-session packages for security. This level was quite challenging but the degree of security achieved was quite the effort.

6. The final level was implementing OAuth(Open Authorisation) 2.0 to the website. This is where the user tries to use a third party website such as google or facebook to login or signup to my secrets page. 
