/* @flow */

import compareStrength from './compareStrength';
import type { Pokemon } from '../types';

export default function findClosestMatch(
  pokemons: Array<Pokemon>,
  pokemon: Pokemon,
  stronger: boolean = true
) {  

  const Compare = (propName) =>
  (a, b) => a[name] == b[name] ? 1 : 0

  const items = pokemons.sort(Compare('name'));
  console.log(items);
  return items[items.length];
}
