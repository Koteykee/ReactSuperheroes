import { create } from "zustand";
import { getSuperheroById, getSuperheroes } from "../api/api";
import type { Superhero } from "../types/superhero.type";

interface SuperheroStore {
  fetchSuperheroes: () => Promise<Superhero[] | undefined>;
  loadSuperhero: (id: Superhero["id"]) => Promise<Superhero | undefined>;
}

export const useSuperheroStore = create<SuperheroStore>(() => ({
  fetchSuperheroes: async () => {
    try {
      const response = await getSuperheroes();
      if (response) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },

  loadSuperhero: async (id) => {
    try {
      if (typeof id === "string") {
        const stored: Superhero[] = JSON.parse(
          localStorage.getItem("superheroes") ?? "[]"
        );

        const localHero = stored.find((hero) => hero.id === id);
        return localHero ?? undefined;
      }

      if (typeof id === "number") {
        return getSuperheroById(id);
      }
    } catch (error) {
      console.error(error);
    }
  },
}));
