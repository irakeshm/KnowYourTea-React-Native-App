/* @flow */

export type PokemonType =
  | 'Black-Tea'
  | 'Dark'
  | 'Dragon'
  | 'Oolong-Tea'
  | 'Fairy'
  | 'Fighting'
  | 'PuErh-Tea'
  | 'Flying'
  | 'Ghost'
  | 'Green-Tea'
  | 'White-Tea'
  | 'Ice'
  | 'Blend-Tea'
  | 'Poison'
  | 'Psychic'
  | 'Rock'
  | 'Steel'
  | 'Herbal-Tea';

export type EvolutionItem =
  | 'Dragon Scale'
  | "King's Rock"
  | 'Metal Coat'
  | 'Sun Stone'
  | 'Up-Grade';

export type PokemonID = number;

export type Pokemon = {|
  id: PokemonID,
  name: string,
  types: Array<PokemonType>,
  category: string,
  description: string,
  name_origin: Array<{
    term: string,
    meaning: string,
  }>,
  moves: {
    quick: Array<string>,
    cinematic: Array<string>,
  },
  measurements: {
    height: {
      amount: number,
      unit: 'm' | 'cm',
    },
    weight: {
      amount: number,
      unit: 'g' | 'kg',
    },
  },
  stats: {
    stamina: number,
    attack: number,
    defense: number,
  },
  points: {
    max_cp: number,
  },
  evolution?: {
    parent?: PokemonID,
    branch?: Array<{
      id: PokemonID,
      candy_cost: number,
      item_requirement?: EvolutionItem,
    }>,
  },
  evolution_cp_multipliers?: Array<{
    id: PokemonID,
    multipliers: {
      minimum: number,
      maximum: number,
    },
  }>,
  egg_distance?: {
    amount: number,
    unit: 'km',
  },
  buddy_distance?: {
    amount: number,
    unit: 'km',
  },
  encounter: {
    capture_rate?: number,
    flee_rate: number,
  },
  easter_eggs?: Array<string>,
|};

export type TypeChart = {|
  name: PokemonType,
  super_effective: Array<PokemonType>,
  not_very_effective: Array<PokemonType>,
|};

export type Move = {|
  name: string,
  type: PokemonType,
  power?: number,
  duration: number,
  energy_delta: number,
  accuracy_chance: number,
  critical_chance?: number,
  stamina_loss: number,
  quick: boolean,
|};
