const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()

  .post('/', (req, res, next) => {
    const {
      name,
      address
    } = req.body;

    Studio
      .create({ name, address })
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find()
      .select({ _id: true, name:true, })
      .then(studios => res.send(studios))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Promise.all([
      Studio.findById(req.params.id),
      Film.find({ studio: req.params.id })
    ])
      .then(([studio, films]) => res.send({ ...studio.toJSON(), films }))
      .catch(next);
  })



  
;
