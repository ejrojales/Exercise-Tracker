import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercise] = useState([]);

    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercise(exercises.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete movie with id = ${_id}, status code = ${response.status}`)
        }
    }

    const onEdit = exercise => {
        setExerciseToEdit(exercise)
        history.push("/edit-exercise")
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercise(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <Link to="/add-exercise">Add an exercise</Link>
        </>
    );
}

export default HomePage;