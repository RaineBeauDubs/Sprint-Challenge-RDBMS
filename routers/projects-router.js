const router = require('express').Router();
const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig.development)

router.get('/', (req, res) => {
  db('projects')
    .then(projects => {
      res
        .status(200)
        .json(projects)
    })
    .catch(error => {
      res
        .status(500)
        .json(error)
    })
});

router.get('/:id', (req, res) => {
  db('projects')
    .where({
      id: req.params.id
    })
    .first()
    .then(action => {
      res
        .status(200)
        .json(action)
    })
    .catch(error => {
      res
        .status(500)
        .json(error)
    })
})

router.get('/:id/actions', (req, res) => {
  db('projects')
    .innerJoin('actions', 'project_id', '=', 'actions.project_id')
    .then(actions => {
      res
        .status(200)
        .json(actions)
    })
})

router.post('/', (req, res) => {
  db('projects')
    .insert(req.body)
    .then(([id]) => {

      db('projects')
      .where({ id })
      .first()
      .then(project => {
        res
          .status(200)
          .json(project);
      })
    })
    .catch(error => {
      res
        .status(500)
        .json(error);
    })
});

module.exports = router;