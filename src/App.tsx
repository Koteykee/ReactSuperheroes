import { BrowserRouter, Route, Routes } from "react-router-dom";

import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./components/Home";
import { SuperheroPage } from "./components/SuperheroPage/SuperheroPage";
import { Signin } from "./components/Signin/Signin";
import { MySuperheroesPage } from "./components/MySuperheroes/MySuperheroesPage/MySuperheroesPage";
import { SuperheroForm } from "./components/MySuperheroes/SuperheroForm/SuperheroForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/superhero/:id" element={<SuperheroPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/mysuperheroes" element={<MySuperheroesPage />} />
          <Route path="/superheroform/:id?" element={<SuperheroForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
