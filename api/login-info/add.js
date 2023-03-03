import DB_client from '../../utils/db.js'
import {cors} from '../../utils/cors.js'

const db = new DB_client({
  table: 'davinci_web_permissions'
})

export default cors(function (req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST')
  let info = req.body.info
  let id = req.body.id

  if (!info || !id) {
    res.status(404)
  }

  db.updateItem(id, {
    login_info: info
  }).then(r => {
    res.json({
      status: 0,
      message: 'successfully updated login info to the database'
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      status: 9,
      error: err,
      message: err.message
    })
  })
})