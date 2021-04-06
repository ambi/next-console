import { NextApiRequest, NextApiResponse } from 'next'
import usersData from '../../../mock/users'

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

function checkUser(req: NextApiRequest) {
  let id = req.query['id']
  if (typeof id !== 'string') id = req.query['id'][0]

  return { user: usersData.find(user => user.id === id) }
}

function getHandler(req: NextApiRequest, res: NextApiResponse) {
  let { user } = checkUser(req)

  if (!user) {
    res.statusCode = 404
    res.json({ error: 'not found' })
    return
  }

  res.statusCode = 200
  res.json(user)
}

function putHandler(req: NextApiRequest, res: NextApiResponse) {
  let { user } = checkUser(req)

  if (!user) {
    res.statusCode = 404
    res.json({ error: 'not found' })
    return
  }

  Object.assign(user, { name: req.body.name, email: req.body.email })

  res.statusCode = 200
  res.json(user)
}
