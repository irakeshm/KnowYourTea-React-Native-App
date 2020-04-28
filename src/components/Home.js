/* @flow */

import * as React from 'react';
import { StackNavigator } from 'react-navigation';
import PokemonChooser from './PokemonChooser';
import Splash from './Splash';

import PokemonInfo from './PokemonInfo';
import StrongAgainstList from './StrongAgainstList';
import WeakAgainstList from './WeakAgainstList';

const Home = StackNavigator(
  {
    Splash: { screen: Splash },
    Main: { screen: PokemonChooser },
    StrongAgainst: { screen: StrongAgainstList },
    WeakAgainst: { screen: WeakAgainstList },
    Info: { screen: PokemonInfo },
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  }
);

// eslint-disable-next-line jsx/no-bind
export default () => <Home onNavigationStateChange={() => {}} />;
