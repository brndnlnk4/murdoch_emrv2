const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require("express")
const moment = require("moment")
const router = express.Router()
const path = require("path")
const _ = require('lodash');
const os = require("os")

const MySQL = require('mysql2');
const multer = require("multer")
const fs = require('fs');
// const AWS = require("aws-sdk")
// const busboy = require("busboy")
// const multers3 = require('multer-s3')
// const upload = multer();
// const busboyParser = require("busboy-parser")
const Patients = require('../models/Patients');
const rxnorm_endpoints = require("../rxnorm-js/lib/rxnorm")


const exampleResp = {
	"drugGroup":{"name":"alprazolam","conceptGroup":[{"tty":"BPCK"},{"tty":"GPCK"},{"tty":"SBD","conceptProperties":[{"rxcui":"141927","name":"alprazolam 0.25 MG Oral Tablet [Xanax]","synonym":"Xanax 0.25 MG Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C0542887","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"alprazolam 0.25 MG  "},{"rxcui":"141928","name":"alprazolam 0.5 MG Oral Tablet [Xanax]","synonym":"Xanax 0.5 MG Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C0542888","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"alprazolam 0.5 MG  "},{"rxcui":"214003","name":"alprazolam 1 MG Oral Tablet [Xanax]","synonym":"Xanax 1 MG Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C0717162","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"alprazolam 1 MG  "},{"rxcui":"214004","name":"alprazolam 2 MG Oral Tablet [Xanax]","synonym":"Xanax 2 MG Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C0717163","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"alprazolam 2 MG  "},{"rxcui":"687022","name":"24 HR alprazolam 3 MG Extended Release Oral Tablet [Xanax]","synonym":"24 HR Xanax 3 MG Extended Release Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C1329641","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"24 HR alprazolam 3 MG Extended Release  "},{"rxcui":"687023","name":"24 HR alprazolam 2 MG Extended Release Oral Tablet [Xanax]","synonym":"24 HR Xanax 2 MG Extended Release Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C1329640","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"24 HR alprazolam 2 MG Extended Release  "},{"rxcui":"687024","name":"24 HR alprazolam 1 MG Extended Release Oral Tablet [Xanax]","synonym":"24 HR Xanax 1 MG Extended Release Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C1329639","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"24 HR alprazolam 1 MG Extended Release  "},{"rxcui":"687025","name":"24 HR alprazolam 0.5 MG Extended Release Oral Tablet [Xanax]","synonym":"24 HR Xanax 0.5 MG Extended Release Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C1329638","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"24 HR alprazolam 0.5 MG Extended Release  "}]},{"tty":"SCD","conceptProperties":[{"rxcui":"197321","name":"alprazolam 1 MG Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C0687816","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 1 MG "},{"rxcui":"197322","name":"alprazolam 2 MG Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C0687817","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 2 MG "},{"rxcui":"308047","name":"alprazolam 0.25 MG Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C0974159","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 0.25 MG "},{"rxcui":"308049","name":"alprazolam 0.1 MG/ML Oral Solution","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C0974161","dfg":["Oral Solution"],"brand":"Generic","modifiedname":"alprazolam 0.1 MG/ML "},{"rxcui":"308050","name":"alprazolam 1 MG/ML Oral Solution","synonym":"alprazolam 1 MG per 1 ML Concentrate for Oral Solution","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C0974162","dfg":["Oral Solution"],"brand":"Generic","modifiedname":"alprazolam 1 MG/ML "},{"rxcui":"433799","name":"24 HR alprazolam 2 MG Extended Release Oral Tablet","synonym":"alprazolam 2 MG 24 HR Extended Release Oral Tablet","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1363069","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"24 HR alprazolam 2 MG Extended Release "},{"rxcui":"433800","name":"24 HR alprazolam 1 MG Extended Release Oral Tablet","synonym":"alprazolam 1 MG 24 HR Extended Release Oral Tablet","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1363070","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"24 HR alprazolam 1 MG Extended Release "},{"rxcui":"485413","name":"alprazolam 0.25 MG Disintegrating Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1576460","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 0.25 MG Disintegrating "},{"rxcui":"485414","name":"alprazolam 1 MG Disintegrating Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1576461","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 1 MG Disintegrating "},{"rxcui":"485416","name":"alprazolam 2 MG Disintegrating Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1576463","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 2 MG Disintegrating "},{"rxcui":"308048","name":"alprazolam 0.5 MG Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C0974160","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 0.5 MG "},{"rxcui":"433798","name":"24 HR alprazolam 0.5 MG Extended Release Oral Tablet","synonym":"alprazolam 0.5 MG 24 HR Extended Release Oral Tablet","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1363068","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"24 HR alprazolam 0.5 MG Extended Release "},{"rxcui":"485415","name":"alprazolam 0.5 MG Disintegrating Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1576462","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 0.5 MG Disintegrating "},{"rxcui":"433801","name":"24 HR alprazolam 3 MG Extended Release Oral Tablet","synonym":"alprazolam 3 MG 24 HR Extended Release Oral Tablet","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1363071","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"24 HR alprazolam 3 MG Extended Release "}]}]},"compiled":[{"rxcui":"141927","name":"alprazolam 0.25 MG Oral Tablet [Xanax]","synonym":"Xanax 0.25 MG Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C0542887","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"alprazolam 0.25 MG  "},{"rxcui":"141928","name":"alprazolam 0.5 MG Oral Tablet [Xanax]","synonym":"Xanax 0.5 MG Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C0542888","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"alprazolam 0.5 MG  "},{"rxcui":"214003","name":"alprazolam 1 MG Oral Tablet [Xanax]","synonym":"Xanax 1 MG Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C0717162","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"alprazolam 1 MG  "},{"rxcui":"214004","name":"alprazolam 2 MG Oral Tablet [Xanax]","synonym":"Xanax 2 MG Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C0717163","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"alprazolam 2 MG  "},{"rxcui":"687022","name":"24 HR alprazolam 3 MG Extended Release Oral Tablet [Xanax]","synonym":"24 HR Xanax 3 MG Extended Release Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C1329641","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"24 HR alprazolam 3 MG Extended Release  "},{"rxcui":"687023","name":"24 HR alprazolam 2 MG Extended Release Oral Tablet [Xanax]","synonym":"24 HR Xanax 2 MG Extended Release Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C1329640","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"24 HR alprazolam 2 MG Extended Release  "},{"rxcui":"687024","name":"24 HR alprazolam 1 MG Extended Release Oral Tablet [Xanax]","synonym":"24 HR Xanax 1 MG Extended Release Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C1329639","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"24 HR alprazolam 1 MG Extended Release  "},{"rxcui":"687025","name":"24 HR alprazolam 0.5 MG Extended Release Oral Tablet [Xanax]","synonym":"24 HR Xanax 0.5 MG Extended Release Oral Tablet","tty":"SBD","language":"ENG","suppress":"N","umlscui":"C1329638","dfg":["Oral Tablet"],"brand":"Xanax","modifiedname":"24 HR alprazolam 0.5 MG Extended Release  "},{"rxcui":"197321","name":"alprazolam 1 MG Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C0687816","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 1 MG "},{"rxcui":"197322","name":"alprazolam 2 MG Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C0687817","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 2 MG "},{"rxcui":"308047","name":"alprazolam 0.25 MG Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C0974159","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 0.25 MG "},{"rxcui":"308049","name":"alprazolam 0.1 MG/ML Oral Solution","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C0974161","dfg":["Oral Solution"],"brand":"Generic","modifiedname":"alprazolam 0.1 MG/ML "},{"rxcui":"308050","name":"alprazolam 1 MG/ML Oral Solution","synonym":"alprazolam 1 MG per 1 ML Concentrate for Oral Solution","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C0974162","dfg":["Oral Solution"],"brand":"Generic","modifiedname":"alprazolam 1 MG/ML "},{"rxcui":"433799","name":"24 HR alprazolam 2 MG Extended Release Oral Tablet","synonym":"alprazolam 2 MG 24 HR Extended Release Oral Tablet","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1363069","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"24 HR alprazolam 2 MG Extended Release "},{"rxcui":"433800","name":"24 HR alprazolam 1 MG Extended Release Oral Tablet","synonym":"alprazolam 1 MG 24 HR Extended Release Oral Tablet","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1363070","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"24 HR alprazolam 1 MG Extended Release "},{"rxcui":"485413","name":"alprazolam 0.25 MG Disintegrating Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1576460","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 0.25 MG Disintegrating "},{"rxcui":"485414","name":"alprazolam 1 MG Disintegrating Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1576461","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 1 MG Disintegrating "},{"rxcui":"485416","name":"alprazolam 2 MG Disintegrating Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1576463","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 2 MG Disintegrating "},{"rxcui":"308048","name":"alprazolam 0.5 MG Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C0974160","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 0.5 MG "},{"rxcui":"433798","name":"24 HR alprazolam 0.5 MG Extended Release Oral Tablet","synonym":"alprazolam 0.5 MG 24 HR Extended Release Oral Tablet","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1363068","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"24 HR alprazolam 0.5 MG Extended Release "},{"rxcui":"485415","name":"alprazolam 0.5 MG Disintegrating Oral Tablet","synonym":"","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1576462","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"alprazolam 0.5 MG Disintegrating "},{"rxcui":"433801","name":"24 HR alprazolam 3 MG Extended Release Oral Tablet","synonym":"alprazolam 3 MG 24 HR Extended Release Oral Tablet","tty":"SCD","language":"ENG","suppress":"N","umlscui":"C1363071","dfg":["Oral Tablet"],"brand":"Generic","modifiedname":"24 HR alprazolam 3 MG Extended Release "}],"dfg":["Oral Tablet","Oral Solution"],"brand":["Xanax"]
}

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
router.use(cookieParser())
// router.use(busboy())

console.log("\n _______ AUTH ROUTE REQUESTED__________\n");


const fileName = 'fileUpload'
const multerConfig = ({
	storage: multer.diskStorage({
		destination: (req, file, next) => {

			fs.existsSync('./public/uploads') || fs.mkdirSync('./public/uploads')

			next(null, './public/uploads')///NEXT(ERR, IMAGE_PATH	)
		},
		filename: (req, file, next) => {
			const ext = file.mimetype.split('/')[1]

			console.log(`+++++ file fieldName: ${file.fieldname} \n\n +++++++file ext: ${ext} \n\n `, file);

			next(null, `${fileName}.${ext}`)
		}
	})
});
const uploadFileViaMulter = (req, res) => {
	if(!req) return;

	let limits = { fileSize: 1000000 }; ///1mb
	let { storage } = multerConfig;
	let multerSingleUpload = multer({
		storage,
		limits
	}).single(fileName);
	let multerMultipleUpload = multer.diskStorage({
		destination: path.normalize('../uploads'),
		fileName: file.originalfilename
	})
	let data = {
		data: `
			\n\n ---- req object: ${req}
			\n\n ---- req.route.path: '${req.route.path}'
			\n\n ---- req.files: '${JSON.stringify(req.file)}'
			\n\n ---- req.params: '${JSON.stringify(req.params)}'
			\n\n ---- req.headers: ${JSON.stringify(req.headers)}
			`
	}

	////begin upload and get result-statusRxNormQuery
	multerMultipleUpload(req, res, (err) => {
		console.log(`-----req.files: `, req.file);

		if(!err) res.status(200).send('sucessfully uploadved file')
		else console.log(`______ multer  fileupload errorv: ${err}`);
	})
};

////AUTH ROUTES
const AuthRoute = ({ dbOptions }) => {
	// const _db_ = MySQL.createConnection({ ...dbOptions })

	////PRESCRIPTIONS
	router.route("/prescriptions/:id?")
		.get((req, res, next) => {
			res.send("\n\n ----'%s' route request method: '%s'", req.route.path, req.method)
		})
		.post((req, res, next) => {
			res.send("\n\n ----'%s' route request method: '%s'", req.route.path, req.method)
		})
		.put((req, res, next) => {
			res.send("\n\n ----'%s' route request method: '%s'", req.route.path, req.method)
		})
		.patch((req, res, next) => {
			res.send("\n\n ----'%s' route request method: '%s'", req.route.path, req.method)
		.all((req, res, next) => {
			res.send("error with requested route ", next(err))
		})

	})//END router.route


	/////PATIENTS
	// router.use('/patients/', (req, res, next) => {
		// console.log(`******** router.use req params/body: '${JSON.stringify(req.params)} / ${JSON.stringify(req.body)}'`)
		// next()
	// })
	router.route("/patients/:requestIntent?")
		.all((req, res, next) => {
			console.log(`\n** REQUEST RECEIVED: route.all(): NEW request via '${req.method}' request to '${req.route.path}' route`);
			console.log(` with req.body '${JSON.stringify(req.body)}' with url-param '${JSON.stringify(req.params)}'\n\n`);

			next()
		})
		.get((req, res) => {
			const requestIntent = req.params.requestIntent && _.trim(req.params.requestIntent);
			const getQryParam = req.query;

			switch (requestIntent) {
				case 'count':

				try {
					(async () => {
						let [ count ] = await PRxNormQueryatients().getPatientCount()

						console.log(`\n\n!!!! patients count: ${JSON.stringify(count)}`);
						res.json(count)

					})();
				} catch (e) {
					console.log(`!!!! promise error getting patient data from db: `, next);
				}
					break;
				case 'all':

				try {
					(async () => {
						let data = await Patients().getPatients({}, {...req.query})

						res.json(data)

					})();
				} catch (e) {
					console.log(`!!!! promise error getting patient data from db: `, next);
				}
					break;
				default:

					console.log(`\n______ route(/patients/...) with params: requestIntent: '${requestIntent}', urlQry: '${getQryParam}' requested`);
					break
			}///end switch
		})///end .get()
		.post((req, res) => {
			const requestIntent = req.params.requestIntent && _.trim(req.params.requestIntent);

			switch (requestIntent) {
				case 'add':
					try {
						console.log(`\n\n !!!!! adding new patient request received, pt data: `, {...req.body});
						(async () => {
							let data = await Patients().addPatient({ ...req.body })

							console.log(`\n_____ REQUESTiNTENT: ${requestIntent}, \n\n_____ data received: `, data);

							res.json(data) //{ insertedRows, insertId, affectedRows }
						})();
					} catch (e) {
						console.log(`\n\n !!! error with received req.post: `, e);
					}
					break;
				default:
					console.log(`\n\n ---- switch default called`);
			}
		})
		.put((req, res) => {
			res.send("\n\n ----'%s' route request method: '%s'", req.route.path, req.method)
		})
		.patch((req, res) => {
			res.send("\n\n ----'%s' route request method: '%s'", req.route.path, req.method)
		})//END Patients router.route


	/////APPOINTMENTS
	router.route("/appointments/:user_id?")

		.all((req, res, next) => {
			res.send("error with requested route ", next(err))
		})
		.get((req, res, next) => {
			res.send("\n\n ----'%s' route request method: '%s'", req.route.path, req.method)
		})
		.post((req, res, next) => {
			res.send("\n\n ----'%s' route request method: '%s'", req.route.path, req.method)
		})
		.put((req, res, next) => {
			res.send("\n\n ----'%s' route request method: '%s'", req.route.path, req.method)
		})
		.patch((req, res, next) => {
			res.send("\n\n ----'%s' route request method: '%s'", req.route.path, req.method)
		})//END router.route


	/////RXNORM API
	router.route("/rx/:rxNormEndpoint?")
		.all(function(req, res, next) {
			const { rxNormEndpoint } = req.params;
			const rxNormEndpoints = [
				"datalist",
			  "queryfdaCode",
			  "queryfdaName",
			  "queryRxImageCode",
			  "queryRxNormName",
			  "queryRxNormApproximate",
			  "queryRxNormDFG",
			  "queryMedlinePage",
			  "queryRxNormSpelling",
			  "queryRxNormGroup",
			];

			if(typeof rxNormEndpoint === 'undefined') next(`!error: no rxNorm 'rxNormEndpoint' specified`);
			else if(!req.xhr) next('!error: rxNorm-API accepts only XHR/AJAX request')
			else if(!rxNormEndpoints.includes(rxNormEndpoint)) next('!error: not a valid RxNorm endpoint/type');
			else next()
		})
		.get(function(req, res, next) {
			let { rxNormEndpoint } = req.params;
			let { name:searchTerm } = req.query;
			let getDefaultDatalistClosure = () => (async () => {
				try {
					let data = new Promise(function(resolve, reject) {
						fs.readFile(path.join(__dirname, "../rxnorm-js/lib/dose_form_groups.txt"), "utf-8", (err, data) => {
							return !err ? resolve(data) : console.error(`\n--ERROR YO: `, reject(err))
						})
					}).then(function(response) {
						return response.split('\n')
					});
					let dataResponse = await data

					return { dataResponse } ///return object with key: [dataResponse]: ...
				} catch (e) {
					console.log(`\n _____ doseFormGroup.txt error: `, e);
				}
			})();
			let onResponse = (err, response) => {
				res.json(exampleResp); return; ////Use this as a mock object when internet not available
				if(err) next(err)
				else res.json(response)
			}//END onResponse callback

			//QUERY RXNORM ENDPOINT AND RETURN DATA VIA RESPONSE
			(async function() {
				switch (rxNormEndpoint) {
					case 'datalist':
						let response = await getDefaultDatalistClosure();
						let responseArr = await response;

						res.json(responseArr)
					break;
						default:
						rxnorm_endpoints[rxNormEndpoint](searchTerm, onResponse);
				}///END switch
			})();
		})///END rxNorm

		return router; //ROUTER OBJECT RETURNED TO INVOKER

	}////END authRoutes()


module.exports = appLocals => AuthRoute(appLocals)

/* STATUS CODES
res.sendStatus(200); // equivalent to res.status(200).send('OK')
res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')
*/
