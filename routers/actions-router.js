const router = require('express').Router();
const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig.development)

router.get('/', (req, res) => {
  db('actions')
    .then(actions => {
      res
        .status(200)
        .json(actions)
    })
    .catch(error => {
      res
        .status(500)
        .json(error)
    })
});

router.post('/', (req, res) => {
  db('actions')
    .insert(req.body)
    .then(([id]) => {

      db('actions')
      .where({ id })
      .first()
      .then(action => {
        res
          .status(200)
          .json(action);
      })
    })
    .catch(error => {
      res
        .status(500)
        .json(error);
    })
});

module.exports = router;