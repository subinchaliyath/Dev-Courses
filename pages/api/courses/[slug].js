const { courses } = require('./data.json')

export default (req, res) => {
  const cours = courses.filter((cour) => cour.slug === req.query.slug)

  if (req.method === 'GET') {
    res.status(200).json(cours)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  }
}
