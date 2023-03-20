This repository is just for the practice of authentication and security. The practice was divided into six (6) levels where each preceeding level adds more security advantages over the former. 

1. The first level basically deals with storing user's username and password to a database.  In this case, a mongoose database was used to store user's data.

2. Level 2 involved encryption. In this level, the mongoose-encryption package was used to provide some encryption for the user's password generated. This level also provided some vulnerabilities hence the need for a more secure option.

3. Hashing was tackled at level with the help of the md5 package. The password of the user then hashed safely but one disadvantage of this level of hashing wa show the md5 package genarates the same encrypted message fo r the same string of characters with makes hacking of users of same password very likely the moment one user's get  comprehended.
