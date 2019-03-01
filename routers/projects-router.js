const router = require('express').Router();
const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig.development)

// GET REQUESTS

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

// POST REQUEST

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

// UPDATE REQUEST

router.put('/:id', (req, res) => {
  db('projects')
    .where({ 
      id: req.params.id 
    })
    .update(req.body)
    .then(response => {
      if(response > 0) {
        db('projects')
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
            message: 'Oops! This project was not found!' 
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
  db('projects')
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
            message: 'Oh no, this project was not found!' 
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