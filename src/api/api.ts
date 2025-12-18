import axios from "axios";

import { SUPERHERO_API } from "../config/config";
import type { Superhero } from "../types/superhero.type";

const Api = axios.create({ baseURL: `${SUPERHERO_API}` });

export const getSuperheroes = async (): Promise<Superhero[]> => {
  const { data } = await Api.get(`/all.json`);
  return data;
};

export const getSuperheroById = async (id: number): Promise<Superhero> => {
  const { data } = await Api.get(`/id/${id}.json`);
  return data;
};
