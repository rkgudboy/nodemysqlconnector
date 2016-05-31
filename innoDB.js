/* 
* Skill Test for WebYog Hiring - Rohit Kashyap
* Google Student Ambassador
* NIT Patna
* rohit123913@nitp.ac.in
* +91-9504965828
* Problem Statement : Write a program in C/C++, Nodejs or Python that connects to a MySQL server and checks if the InnoDB plugin is enabled on it. 
*                     If so, your program should print the total number of disk writes by MySQL.
* Solution Stack : Node.js
* 
*/

/*
* Prerequisite : Node.js and MySQL Plugin for Node.js should be installed before running this program
* Node.js : Download from nodejs.org, MySQL Server : Download from : http://dev.mysql.com/downloads/
* MySQL Plugin for Node.js can be installed from Node.js command prompt with following command "npm install mysql"
* URL : https://www.npmjs.com/package/mysql
* Mysql Server should be installed on system and running while running this program
*/

var mysql = require('mysql');

/*
* Creating a connection to interact with MySQL Server running on system
*/ 

var connection = mysql.createConnection(
    {
      host     : 'localhost',  //replace with your MySQL Server Host
      user     : 'root',       //replace with your MySQL Server Username
      password : 'root',       //replace with your MySQL Server Password
      database : 'information_schema'
    }
);

/*
* Attempting to connect to MySQL Server, if Connection is successfull, success message with connection ID will be displayed
* In case of an unsuccessfull connection attempt, corresponding error will be displayed
*/ 

connection.connect(function(err) {if (err) {console.error('Connection Error in connecting to MySQL Server on ID:' + err.stack);return;}
  console.log('Successfully Connected with MySQL Server on ID:' + connection.threadId);
});

/*
* Checking status of InnoDB Engine supported by MySQL server on System
* After selecting "Information_schema" database, query "SELECT PLUGIN_NAME,PLUGIN_STATUS FROM plugins where PLUGIN_NAME="INNODB""
* will directly give us the result in form of Yes or No
*
*/

var strQuery = 'SELECT PLUGIN_NAME,PLUGIN_STATUS FROM plugins where PLUGIN_NAME="INNODB"';	
connection.query( strQuery, function(err, rows){
  	if(err)	{
  		throw err;
  	}else{
  		console.log( rows );
  	}
  });

/*
* SHOW STATUS provides server status information. 
* This statement does not require any privilege.
* It requires only the ability to connect to the server.
* Tuple key_writes provides us with total number of disk writes by MySQL. 
*/

var strQuery = 'SHOW STATUS WHERE Variable_name="key_writes"';	
connection.query( strQuery, function(err, rows){
  	if(err)	{
  		throw err;
  	}else{
  		console.log( rows );
  	}
  });


/*
* Closing the running MySQL connection with <connection_name>.end command.
*/

connection.end(function(err) {console.log('Successfully Disconnected with MySQL Server on ID:' + connection.threadId);});