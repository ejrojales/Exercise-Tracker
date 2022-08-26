import 'dotenv/config';
import * as exercises from './exercise_model.mjs';
import express from 'express';
import { body, validationResult } from 'express-validator';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());


function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}


app.post(
    '/exercises',
    body('name').isLength({ min: 1 }),
    body('reps').isInt({ min: 1 }),
    body('weight').isInt({ min: 1 }),
    body('unit').isIn(['lbs', 'kgs']),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty() || isDateValid(req.body.date) === false) {
            return res.status(400).json({ Error: 'Invalid request' });
        }
        exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            .then(exercise => {
                res.status(201).json(exercise);
            })
    });



app.get('/exercises/:_id',
    (req, res) => {
        const exerciseId = req.params._id;
        exercises.findExerciseById(exerciseId)
            .then(exercise => {
                if (exercise !== null) {
                    res.json(exercise);
                } else {
                    res.status(404).json({ Error: "Not found" });
                }
            })
            .catch(error => {
                res.status(404).json({ Error: "Not found" });
            });
    });


app.get('/exercises',
    (req, res) => {
        exercises.findExercise()
            .then(exercises => {
                res.send(exercises);
            })
            .catch(error => {
                console.error(error);
                res.send({ Error: 'Request failed' });
            });
    });


app.put('/exercises/:_id',
    body('name').isLength({ min: 1 }).isAlpha(),
    body('reps').isInt({ min: 1 }),
    body('weight').isInt({ min: 1 }),
    body('unit').isIn(['lbs', 'kgs']),
    (req, res) => {

        const update = {};

        if (req.body.name !== undefined) {
            update.name = req.body.name
        };
        if (req.body.reps !== undefined) {
            update.reps = req.body.reps
        };
        if (req.body.weight !== undefined) {
            update.weight = req.body.weight
        };
        if (req.body.unit !== undefined) {
            update.unit = req.body.unit
        };
        if (req.body.date !== undefined) {
            update.date = req.body.date
        };

        const errors = validationResult(req);
        if (!errors.isEmpty() || isDateValid(req.body.date) === false) {
            return res.status(400).json({ Error: 'Invalid request' });
        }

        exercises.updateExercise({ _id: req.params._id }, update)
            .then(numUpdated => {
                if (numUpdated === 1) {
                    exercises.findExerciseById(req.params._id)
                        .then(exercise => {
                            if (exercise !== null) {
                                res.json(exercise);
                            } else {
                                res.status(404).json({ Error: "Not found" });
                            }
                        })
                        .catch(error => {
                            res.status(404).json({ Error: "Not found" });
                        });
                } else {
                    res.status(404).json({ Error: "Not found" });
                }
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({ Error: 'Request failed' });
            });
    });


app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: "Not found" });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});