import { NextApiRequest, NextApiResponse } from 'next'
import groupsData from '../../mock/groups'

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      getHandler(req, res)
      break
    default:
      res.status(405)
      break
  }
}

function getHandler(req: NextApiRequest, res: NextApiResponse) {
  res.statusCode = 200
  res.json(groupsData)
}
