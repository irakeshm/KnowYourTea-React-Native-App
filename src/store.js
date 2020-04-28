/* @flow */

import pokemons from './data/pokemons.json';
import moves from './data/moves.json';
import typeChart from './data/type_chart.json';
import colors from './colors.json';
import sprites from './sprites';
import images from './images';
import images1 from './images1';
import type { Pokemon, PokemonID, PokemonType, Move, TypeChart } from './types';

const MAX_VALUES = {
  attack: 300,
  defense: 200,
  stamina: 320,
  max_hp: 163,
  max_cp: 3904,
};

function getPokemons(): Array<Pokemon> {
  return pokemons;
}

function getMoves(): Array<Move> {
  return moves;
}

function getTypeChart(): Array<TypeChart> {
  return typeChart;
}

function getSprite(id: PokemonID): any {
  return sprites[id - 1];
}

function getImage(id: PokemonID): any {
  return images[id - 1];
}

function getImage1(id: PokemonID): any {
  return images1[id - 1];
}

function getColor(type: PokemonType): string {
  return colors[type.toLowerCase()];
}

function getMaxValues() {
  return MAX_VALUES;
}

export default {
  getPokemons,
  getMoves,
  getTypeChart,
  getSprite,
  getImage,
  getImage1,
  getColor,
  getMaxValues,
};
