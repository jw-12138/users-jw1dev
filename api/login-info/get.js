import {cors} from '../../utils/cors.js'
import {unmarshall} from '@aws-sdk/util-dynamodb'
import DB_client from '../../utils/db.js'

const db = new DB_client({
  table: 'davinci_web_permissions'
})

export default cors(function (req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST')
  let id = req.body.id

  if(!id){
    res.status(400).json({
      status: 9,
      message: 'An ID is required to get the login info.'
    })
    return false
  }

  db.getItem({
    id
  }).then(r => {
    if (r.Item) {
      res.json({
        status: 0,
        data: unmarshall(r.Item)
      })
    } else {
      res.status(404).json({
        status: 9,
        message: 'Your Sign In ID seems to be invalid. Please go back to the App page and try again.'
      })
    }
  }).catch(err => {
    res.status(500).json({
      status: 9,
      message: err.message
    })
  })
})