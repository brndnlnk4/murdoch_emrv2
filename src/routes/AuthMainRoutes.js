const directoryTree = require('directory-tree')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const express = require("express")
const moment = require("moment")
const router = express.Router()
const file = require('file')
const path = require("path")
const _ = require('lodash')
const fs = require('fs')

const { createAuthCookie } = require("../scripts.jsx")


router.use(cookieParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}));

const PUBLIC_DIR = path.resolve(__dirname, 	'../../public')
const { renderIndex, getAllMembers, getMember } = require("../controllers/MembersController")


console.log("\n _______ AUTH-ONLY (MEMBER) ROUTES REQUESTED__________\n")

const _getDeepFilesPromise = async ($directory) => {

	if(_.isEmpty($directory) || !$directory) return Error(`$directory argument is undefined bro`);

	{/*
	return dir ? await getFilesPromise($directory).then(({ dirs, ...restOfData }) => {
		const dirDataPromises = Promise.all(dirs.map($dir => Promise.resolve(getFilesPromise($dir))))
		const dirData = (!_.isEmpty(dirDataPromises.dir)) ? dirDataPromises.concat(Promise.all(dirDataPromises.dirs.map(dir => Promise.resolve(_getDeepFilesPromise(dir))))) : dirs.concat()

		return ({dirs: dirData, ...restOfData})
	}) : false;///END $dataList Promise
	*/}
}/// END _getDeepFilesPromise


////cookieCreatorFn and other essentials
const fileWalkData = ($dir=PUBLIC_DIR) => {
	return new Promise((resolve, reject) => file.walk($dir, (err, path, dirs, files) => err ? reject(err) : resolve(({ path, dirs, files }))),
		err => {
			console.error('\n *** error with fileWalkData(): ',err)
		}
	)///END new Promise
}///END getDirData()


//// ROUTES0
const MemberRoutes = ({ $db_options, appDir }) => {

	router.get("/files", (req, res, next) => {

		const getText = forData => (
			(_.isString(forData)) ? _.trim(forData) : ({
				text: forData ? [...forData] : [...{forData}],
				expanded: true,
			}))

		const getItems = (dataDir) => (
			dataDir && _.map(dataDir => ({
				text: getText(dataDir),
				expanded: true,
				items: dataDir && getItems(dataDir)
			})))

		try{

			(async () => {
				let resp, data, { dir } = req.query///pull dir param

				resp = await fileWalkData(dir)
				data = await resp

				console.log('\n\n ***data: \n %o \n\n', data);

			// console.log(`\n\n>>>> dir param: ${dir} <<<< \n\n>>>> path.join(_dirname, dir): ${path.join(dir)} <<<\n\n`);
			data && res.json({data}).end();

		})()//END async iife

		}catch(err){
			console.log(err)
		}//END trycatch

	})///END router.get

	////patients route
	router.route("/patients")
		.get((req, res, next) => {

			if(_.isEmpty(req.cookies['auth'])) return res.status(401).redirect(`/?status=loggedout+cook ieExpiredBiatch=loggedout`) && null

			const { body } = req.cookies['auth']
			const renewedAuthCookie = createAuthCookie(body, 3980000)

			///pass req.body payload back with response
			res.cookie(...renewedAuthCookie).sendFile(path.resolve(__dirname, "../../public", "index.html"));

			next()
		})////END get


	////members route
	router.route("/member")
		.get((req, res, next) => {

			console.log('____ /member route loaded: qry.params: %o',req.query);
			if(_.isEmpty(req.cookies['auth'])) res.status(401).redirect(`/?status=logout`);

			res.sendFile(path.resolve(__dirname, "../../public", "index.html"));
		})///END route

	return router
};///END route

// router.param("qryType", (req, res, next, $user_id) => {
// 	//getAttributes for user
// 	//		return MembersController($user_id).get()
// })

module.exports = ($locals) => MemberRoutes($locals)
