const router = require('express').Router();
const Kindred = require('../models/kindred.model');
const Grave = require('../models/grave.model');
const auth = require('../middleware/auth');

// GET ALL KINDRED
router.get('/', (req, res) => {
    try {
        Kindred.find({}, (err, kindreds) => {
            if (err) return res.status(400).json({'error': 'something went wrong'});
            res.json(kindreds);
        });
    } catch(err) {
        console.log(err);
        res.status(500).send();
    }
});

// GET ONE KINDRED
router.get('/:id', auth, (req, res) => {
    try {
        Kindred.findById(req.params.id, (err, kindred) => {
            if (err) return res.status(400).json({'error': 'something went wrong'});
            res.json(kindred);
        });
    } catch(err) {
        console.log(err);
        res.status(500).send();
    }
});

// CREATE NEW KINDRED
router.post('/add', auth, (req, res) => {
    try {
        const { name, concept, start, age, clan, ambition, desire } = req.body;

        const newKindred = new Kindred({ name, concept, start, age, clan, ambition, desire, player_id: req.user });

        newKindred.save((err, kindred) => {
            if(err) return console.log(err);
            
            res.json({'success': 'New kindred embraced.'});
        });
    } catch(err) {
        console.log(err);
        res.status(500).send();
    }
});

// EDIT A KINDRED
router.post('/edit/:id', auth, (req, res) => {
    try {
        const kindred = { name, concept, start, age, clan, ambition, desire, player_id } = req.body;

        Kindred.updateOne({'_id': req.params.id}, kindred, (err) => {
            if (err) return res.status(400).json({'error': 'something went wrong'});
            res.json({'success': 'Kindred updated.'});
        });
    } catch(err) {
        console.log(err);
        res.status(500).send();
    }
});

// DELETE A KINDRED
router.delete('/:id', auth, (req, res) => {
    try {
        Kindred.findByIdAndDelete(req.params.id, (err, kindred) => {
            if (err) return res.status(400).json({'error': 'something went wrong'});
            const {name, concept, start, age, clan, ambition, desire, player_id} = kindred;
            const deadKindred = new Grave({name, concept, start, age, clan, ambition, desire, player_id});
            deadKindred.save();
            res.json({'success': 'Kindred faced final death.'});
        });
    } catch(err) {
        console.log(err);
        res.status(500).send();
    }
});

module.exports = router;