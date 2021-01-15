const MySQL = require('mysql2')
const moment = require('moment')
const axios = require('axios')
const $ = require('jquery')
const _ = require('lodash')

const path = require('path')

const { $db_options } = require('../vars')


const db = MySQL.createConnection({ ...$db_options }).promise()


// ---CALLED BY ROUTES
const Members = function($db_options){

	let $db = db($db_options),
			$members = [
				{
					createdAt: new Date(Date.now() - 36000),
					email: "murdock@yahoo.com",
					username: "dr murdock",
					lastName: "murdock",
					deletedAt: false,
					firstName: "adam",
					notifications: [],
					title: "doc",
				},
				{
					createdAt: new Date(Date.now() - 36000),
					email: "sococh@yahoo.com",
					username: "dr socock",
					lastName: "socock",
					deletedAt: false,
					firstName: "daee",
					notifications: [],
					title: "doc",
				}
	]

	return {
		getMember: async ($userId) => {
			let data = await db.query("SELECT * FROM `employees` AS `memberData`")

			console.log(`----getMember(): `, data);

			return data
		},
		newMember: ($userId) => {
			//
		},
		deleteMember: ($userId) => {
			//
		}
	}
}///END Members()


module.exports = Members

{/*
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// simple query
connection.query(
  'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

// with placeholder
connection.query(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Page', 45],
  function(err, results) {
    console.log(results);
  }
);

async function main() {
  // get the client
  const mysql = require('mysql2');
  // create the pool
  const pool = mysql.createPool({host:'localhost', user: 'root', database: 'test'});
  // now get a Promise wrapped instance of that pool
  const promisePool = pool.promise();
  // query database using promises
  const [rows,fields] = await promisePool.query("SELECT 1");

	async function main() {
  // get the client
  const mysql = require('mysql2');
  // create the pool
  const pool = mysql.createPool({host:'localhost', user: 'root', database: 'test'});
  // now get a Promise wrapped instance of that pool
  const promisePool = pool.promise();
  // query database using promises
  const [rows,fields] = await promisePool.query("SELECT 1");
*/}
