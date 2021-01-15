const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const multer = require('multer');

// const MySqlStore = require('express-mysql-session');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const { ApolloServer, gql } = require('apollo-server-express');
const expressValidator = require('express-validator');
const webpackConfig = require('./webpack.config');
const session = require('express-session');
const passport = require('passport');
const webpack = require('webpack');
const mysql = require('mysql2');

const { $db_options, $session_options } = require("./src/vars")
const { typeDefs, resolvers } = require('./src/models/schema/mainSchema');
const config = require('./webpack.config.js');


const upload = multer(); //parses multipart/form-data
const compiler = webpack(webpackConfig);
const app = express();
const port = 9000;


if (process.env.NODE_ENV !== 'production') {
  server.applyMiddleware({ app })
  
  require('dotenv').load();

  app.use(webpackDevMiddleware(compiler, {
    stats: { colors: true },
    noInfo: true,
    publicPath: config.output.publicPath,
  }))
  app.use(webpackHotMiddleware(compiler))
}
// app.use(session($session_options(new MySqlStore($db_options))));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
//app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(express.json());
// app.use(upload.array())
//  console.log('oko');

/* LOCAL VARIABLES */
app.locals.appDir = path.resolve(__dirname, "public");
app.locals.dbOptions = $db_options;
app.locals.testUsers = [
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

/***************************************************************
*	ROUTES ROUTES ROUTES ROUTES ROUTES ROUTES
****************************************************************/
const AjaxRoutes = require('./src/routes/AjaxRoutes')
const MainRoutes = require('./src/routes/MainRoutes')
const AuthMainRoutes = require('./src/routes/AuthMainRoutes')


/***************************************************************
* WEB ROUTES - WEB ROUTES - WEB ROUTE - WEB ROUTES - WEB ROUTES
****************************************************************/
app.use(AuthMainRoutes({ ...app.locals }));
app.use(MainRoutes({ ...app.locals }));
app.use(AjaxRoutes({ ...app.locals }));
app.use(`/${server.graphqlPath}`, (req, res) => {
  console.log(`----->>> MainRoutes.js: request made to '${req.route}'`);
})


app.listen(port, (err) => {
	if(err) console.log(`____ERROR CONNECTING TO NODE-SERVER VIA EXPRESS___`);

	console.log(`____ CONNECTED TO EXPRESS / NODE @ ${app.baseUrl + server.graphqlPath}_____`);
})
/* Request Properties
	req.protocol: Contains the request protocol string: either http or (for TLS requests) https.
	req.route: Contains the currently-matched route, a string. For example:
	req.path: Contains the path part of the request URL.
	req.originalUrl: Contains a string corresponding to the HTTP method of the request: GET, POST, PUT, and so on.
	req.hostname: Contains the hostname derived from the Host HTTP header.
	req.baseUrl: The URL path on which a router instance was mounted.
	req.xhr: A Boolean property that is true if the request’s X-Requested-With header field is “XMLHttpRequest”
	req.ip: Contains the remote IP address of the request.
	req.url: Contains the full URL with parameters.
*/
/* STATUS CODES
	res.sendStatus(200); // equivalent to res.status(200).send('OK')
	res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
	res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
	res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')
*/
//
//
/* JSX VIEW-ENGINE WITH EXPRESS
	app.set('view engine', 'jsx');
	app.engine('jsx', require('express-react-views').createEngine({
	  beautify: false,
	  transformViews: true,
	}));
*/

/* MYSQL API METHODS
	 new Client(host:string, port:number, database:string, username:string, password:string): Client
	 Client.prototype.connect(): void
	-Get the client instance and connect to the server.

	Client.prototype.query(sqlStatement:string): Promise<Object>
	-Database query operation.

	Client.prototype.close(): Promise<void>
	-Disconnect from the MySQL server.
*/
