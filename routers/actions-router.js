const router = require('express').Router();
const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig.development)

// GET REQUEST

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

// POST REQUEST

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

// UPDATE REQUEST
router.put('/:id', (req, res) => {
  db('actions')
    .where({ 
      id: req.params.id 
    })
    .update(req.body)
    .then(response => {
      if(response > 0) {
        db('actions')
          .where({ 
            id: req.params.id 
          })
          .first()
          .then(response => {
            res
              .status(200)
              .json(response)
          })
      } else {
        res
          .status(404)
          .json({ 
            message: 'Oops! This action was not found!' 
          })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json(error)
    })
});

// DELETE REQUEST

router.delete('/:id', (req, res) => {
  const id = req.params.id
  db('actions')
    .where({ id })
    .del()
    .then(count => {
      if(count > 0) {
        res
          .status(204)
          .end()
      } else {
        res
          .status(404)
          .json({ 
            message: 'Oh no, this action was not found!' 
          })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json(error)
    })
});


module.exports = router;