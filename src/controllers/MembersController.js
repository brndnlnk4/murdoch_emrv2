const fs = require("fs")
const _ = require("lodash")
const $ = require("jquery")
const path = require("path")

const Members = require("../models/Members")


exports.getAllMembers = (req, res, next) => {
	res.status(200).json(Members.allMembers)
}///END getAllMembers
