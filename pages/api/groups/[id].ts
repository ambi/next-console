import { NextApiRequest, NextApiResponse } from 'next'
import groupsData from '../../../mock/groups'

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      getHandler(req, res)
      break
    case 'PUT':
      putHandler(req, res)
      break
    default:
      res.status(405)
      break
  }
}

function checkParams(req: NextApiRequest) {
  let id = req.query['id']
  if (typeof id !== 'string') id = req.query['id'][0]

  return { group: groupsData.find(group => group.id === id) }
}

function getHandler(req: NextApiRequest, res: NextApiResponse) {
  let { group } = checkParams(req)

  if (!group) {
    res.statusCode = 404
    res.json({ error: 'not found' })
    return
  }

  res.statusCode = 200
  res.json(group)
}

function putHandler(req: NextApiRequest, res: NextApiResponse) {
  let { group } = checkParams(req)

  if (!group) {
    res.statusCode = 404
    res.json({ error: 'not found' })
    return
  }

  Object.assign(group, { name: req.body.name }) // TODO: members

  res.statusCode = 200
  res.json(group)
}
