const moment = require('moment')
const axios = require('axios')
const $ = require('jquery')
const _ = require('lodash')
const fs = require('fs');
const path = require('path')
const MySQL = require('mysql2')

const { $db_options } = require('../vars')
const { ModelInterface } = require('../../src/scripts');


const hostPath = '/var/www/html/'
const { query: createQueryFor } = ModelInterface;
const pathResolved = path.resolve(__dirname, '../../');
const getFilesForPathDir = path.resolve(__dirname, './files');


const Patients = (params) => ({

	_db_: MySQL.createPool({ ...$db_options }),
	/** create a qry statement for retrieving patient data from db */
	getPatients(whereFldAsKeyToVal={}, {limit=10, offset=false}=false) {
		try {

			console.log(`\n ---- location.url.qry: limit: '${limit}' offset: '${offset}'`);

			return (async () => {
				const _qry_ = createQueryFor('patients').select().where(whereFldAsKeyToVal).limit(limit, offset).qry;
				const data = await this._db_.promise().query(_qry_)

				///EVENTUALLY USE cb(...responseData) to forward data to next middleware
				const [ rows, fields ] = data;

				// console.log(`~~~~~~~ DATA; row: `, JSON.stringify(rows));
				return ({ rows, fields });

			})()
		} catch (err) {
			return new Error(`err wit getPatients() promise: ${err}`);
		}///END try/catch
	},
	getPatientCount() {
		try{

			return (async () => {
				const _qry_ = createQueryFor("patients").count(false).qry
				const [ count ] = await this._db_.promise().query(_qry_)

				///EVENTUALLY USE cb(...responseData) to forward data to next middleware
				console.log(`\n\n\n createdQry:`,_qry_);
				return count;
			})()
		} catch (err) {
			return new Error(`err wit getPatients() promise: ${err}`);
		}///END try/catch
},
	addPatient(newPatientData={}) {
		// RUN INSERT QRY STATEMENT
		try {
			return (async (newPatientData) => {

				// const data = {..._.map(newPatientData, ({ name, value, id }, key, obj) => ({ [name]: value }))};
				const data = {...newPatientData};

				console.log(`\n ___ data: `, data);

				let { state = `tx` } = data,
						{ city = 'dallas' } = data,
						{ firstName = `firstName_${_.random(20)}` } = data,
						{ lastName = `lastName_${_.random(20)}` } = data,
						{ description = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ` } = data,
						{ birthday = (moment(new Date() - _.random(0, moment())).format('Y-MM-DD')) } = data,
						{ address = `${_.random(9000)} ${moment().day((_.random(7))).format('dddd')} Dallas Tx, ${_.random(7000, 76000)}` } = data

				const insertValues = { firstName, lastName, birthday, address, description, state, city };
				const insertStatement = createQueryFor('patients').insert({ ...insertValues }).qry
				const [ { insertId, affectedRows } ] = await this._db_.promise().query(insertStatement)
				const { rows: insertedRows } = await this.getPatients({id: insertId})

				return { insertedRows, insertId, affectedRows }

			})(newPatientData) //END async
		} catch (err) {
			console.log(`\n ******* err in INSERT QRY: `, err);
		}//END trycatch
	},
  reformattedPatientDataForTreeview(data) {
    if(!data) return null;

    const { path, dirs, files } = data
    const reformattedData = {text: path, items: [], expanded: true}
    const trimFile = $file => _.isString($file) && _.trimStart(trimPath($file), '/')
    const trimPath = $path => {
      let $pathTrimmed = $path.substr(_.trimEnd($path, '/').lastIndexOf('/'))
      let $pathExt = ($pathTrimmed.indexOf('.') > 0) ? $pathTrimmed.substr($pathTrimmed.lastIndexOf('.')) : ''
      let maxLen = 24;

      return ($pathTrimmed.length > maxLen) ? `${$pathTrimmed.substr(0, maxLen)}...${$pathExt}` : $pathTrimmed
    }

    for (var pathDirFilesKey in data) {

      if (data.hasOwnProperty(pathDirFilesKey)) {
        switch (pathDirFilesKey) {
          case 'path':
            reformattedData.text = _.trim(path)
            break;
          case 'files':
            reformattedData.items.push(...files && _.map(files, file => ({
              text: trimFile(file)
            })))
            break;
          case 'dirs':
            reformattedData.items.push(...dirs && _.map(dirs, (subDirPath, index, arr) => ({
              hasChildren: dirs && dirs.length,
              text: `${subDirPath}/`,
              expanded: false,
              // dirItemIndex: index
            })))
            break;
          default:
            null
        }//END switch

      }//END if
    }///END forLoop

    return [{...reformattedData}]
  },//END reformaconstttedDataArfn()

	...ModelInterface

})////END Patients


module.exports = Patients

/*
  app.post("/login", (req, res) => {


    console.log("route: %s was requested", req.path)

    const DB = mysql.createPool($db_options),
    { username, password } = req.body,
    $employees = DB.query("SELECT * FROM `employees`")

    $employees.then($employeeRows => {

      console.log("\n\n ____server login request detected____ \n\n :::employees from db:::",
      $employeeRows,
      "\n\n ___req.body: ",
      JSON.stringify(req.body))
    })//END promise,then()

    //  req.status(200).json({
      //    data: 'success bitch'
      //  })
    })

  const __DB = (qry) => mysql.createPool($db_options).query(qry)
  __DB('SELECT * FROM `employees` LIMIT 1').then((rows) => {
    console.log("pool data: %o", rows);
  });
*/
