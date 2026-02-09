import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useUserStore } from "./stores/userStore";

import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./components/Home";
import { SuperheroPage } from "./components/SuperheroPage/SuperheroPage";
import { Signin } from "./components/Signin/Signin";
import { MySuperheroesPage } from "./components/MySuperheroes/MySuperheroesPage/MySuperheroesPage";

import "./App.css";
import { SuperheroForm } from "./components/MySuperheroes/SuperheroForm/SuperheroForm";
import { AuthGuard } from "./components/AuthGuard/AuthGuard";

function App() {
  useEffect(() => {
    useUserStore.getState().loadFromStorage();
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/superhero/:id" element={<SuperheroPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route element={<AuthGuard />}>
            <Route path="/mysuperheroes" element={<MySuperheroesPage />} />
            <Route path="/superheroform/:id?" element={<SuperheroForm />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
