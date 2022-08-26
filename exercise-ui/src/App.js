import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';
import { useState } from 'react';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header>
        <h1>Exercise Tracker</h1>
        <p>Organize your workouts by logging the name, reps, weight, unit, and date of the exercise.</p>
      </header>
      <Router>
        <Navigation></Navigation>
        <div className="App-header">
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/add-exercise">
            <AddExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit={exerciseToEdit} />
          </Route>
        </div>
      </Router>
      <footer>© 2022 Emmanuel Rojales</footer>
    </div>

  );
}

export default App;