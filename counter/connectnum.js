const counter = require("./counter")

module.exports = {
  returnReqNum : returnReqNum,
}

/**
 * return how many count here.
 * @returns count number
 */
function returnReqNum(){
  let result = counter.count();
  return result;
}


/**
 * 
 * if you use expressjs, use this one
 * @param {*} req 
 * @param {*} res 
 */
// function returnReqNum(req, res){
//   let result = counter.count();
//   res.send(result + "").end();
}

