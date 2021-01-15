const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require("express");
const moment = require("moment");
const router = express.Router();
const path = require("path");
const _ = require('lodash');
const fs = require('fs');


router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
console.log("\n _______ GUEST ROUTE REQUESTED__________\n")


function MainRoutes($db_options) {
	/////LOGIN
	router.route("/login")
		///CLIENT REQUEST LOGI9N HTML PAGE
		.get((req, res, next) => {

			///if users credentials/data authed then ...
			res.sendFile(
				path.resolve(__dirname, '../../public/index.html'), {
				headers: {
					'x-test': true
				}
			})
		})
		///CLIENT POSTS DATA FOR LOGIN AUTH
		.post((req, res, next) => {

			const { body } = req;
			const expiration = moment(moment()).add(144000);

			console.log("\n ____ cookie body: \n",body)

			//		res.clearCookie('cookie_name');
			// res.cookie("auth", {...body}, {maxAge: 480000, expires: expiration.milliseconds()}).json({user: body.username}); ///pass req.body payload back with response
			res.cookie("auth", JSON.stringify({...body}), {maxAge: 960000, expires: expiration.milliseconds()}).json({...body}); ///pass req.body payload back with response
		})

	/////SIGNUP
	router.post("/signup", (req, res, next) => {
		console.log("\n\n __RECEIVED REQUEST 4 '%s' ROUTE VIA '%s' METHOD", req.route.path, req.method)

		res.status(200).send("WOOT successfully requested /login route")

	})///END route

	/////LOGOUT
	router.get("/logout", (req, res, next) => {
		const $cookie = req.cookies['auth'] || false;
		const { username } = ($cookie && _.isString($cookie) && JSON.parse($cookie)) || ($cookie || false);

		// if(!$cookie) return res.status(500).send('cookie not found');
		// res.clearCookie('auth').redirect('/')
		res.clearCookie('auth').redirect(`/?status=loggedout&username=${username || '_'}`);

		console.log("\n LOGOUT GET REQUEST DETECTED FROM GUESTROUTE, COOKIE DATA: ", ($cookie || 'null'))
	})///END route

	//////TEST AUTH0-API ENDPOINT router.get("/callback", (req, res) => {

		res.sendFile('index.html', {
			root: path.resolve(__dirname, "../../public")
		})
	})

///ROOT(home) ROUTE-ENDPOINT '/' HANDLER
	router.get('/', (req, res, next) => {
		const routePath = req.route;

		if(routePath === 'dashboard') return console.log(`\n----->>>>> DASHBOARD ROUTE REQUESTED!! <<<<<<-----`);
		else if(req.route.path !== '/' && !req.cookies['auth']) res.redirect(`/?status=loggedout`);
		else console.log(`\n>>>> ${req.route.path} route requested`);

		res.sendFile('index.html', {
			root: path.resolve(__dirname, "../../public")
		})

		// next()
		console.log(`\n ______ random (unhandled) request received with path: "${req.path}" ____ \n`);
	});

return router };///END MainRoutes()
module.exports = ({ $db_options }) => MainRoutes($db_options)
