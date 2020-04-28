/* @flow */

import React, { PureComponent } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import More from './More';
import PokemonListCard from './PokemonListCard';
import getWeakAgainstPokemons from '../utils/getWeakAgainstPokemons';
import getStrongAgainstPokemons from '../utils/getStrongAgainstPokemons';
import findClosestMatch from '../utils/findClosestMatch';
import type { Pokemon, PokemonID } from '../types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },

  content: {
    padding: 4,
  },

  heading: {
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    opacity: 0.5,
    margin: 4,
    marginTop: 16,
    backgroundColor: 'transparent',
  },

  row: {
    flexDirection: 'row',
  },
});

type Props = {
  pokemon: Pokemon,
  style?: any,
  navigation: Object,
};

type State = {
  containerWidth: number,
};

export default class PokemonMatches extends PureComponent<Props, State> {
  state: State = {
    containerWidth: Dimensions.get('window').width,
  };

  _goToPokemon = (pokemonId: PokemonID) => () => {
    this.props.navigation.navigate('Info', {
      pokemonId,
    });
  };

  _handleStrongPress = () => {
    this.props.navigation.navigate('StrongAgainst', {
      pokemonId: this.props.pokemon.id,
    });
  };

  _handleWeakPress = () => {
    this.props.navigation.navigate('WeakAgainst', {
      pokemonId: this.props.pokemon.id,
    });
  };

  _handleLayout = e => {
    if (this.state.containerWidth === e.nativeEvent.layout.width) {
      return;
    }

    this.setState({
      containerWidth: e.nativeEvent.layout.width,
    });
  };

  render() {
    const { pokemon } = this.props;
    const { containerWidth } = this.state;
    const weakAgainstPokemons = getWeakAgainstPokemons(pokemon);
    const strongAgainstPokemons = getStrongAgainstPokemons(pokemon);

   

    const weakAgainstFirst: ?Pokemon = weakAgainstPokemons.length
      ? findClosestMatch(weakAgainstPokemons, pokemon)
      : null;

    const cardStyle = {
      width: (containerWidth - 8) / Math.floor(containerWidth / 160) - 8,
      margin: 4,
    };

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        {  (
          <View>
            <Text style={styles.heading}>
              Types of {pokemon.category} ({strongAgainstPokemons.length})
            </Text>
            <View style={styles.row}>
              <PokemonListCard
                pokemon={strongAgainstPokemons[0]}
                navigation={this.props.navigation}
                style={cardStyle}
              />
              {strongAgainstPokemons.length > 1 && (
                <More onPress={this._handleStrongPress} style={cardStyle} />
              )}
            </View>
          </View>
        )}

        {weakAgainstFirst && (
          <View>
            <Text style={styles.heading}>
              Weak against ({weakAgainstPokemons.length})
            </Text>
            <View style={styles.row}>
              <PokemonListCard
                pokemon={weakAgainstFirst}
                navigation={this.props.navigation}
                style={cardStyle}
              />
              {weakAgainstPokemons.length > 1 && (
                <More onPress={this._handleWeakPress} style={cardStyle} />
              )}
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}
