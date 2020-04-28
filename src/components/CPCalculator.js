/* @flow */

import React, { PureComponent } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Heading from './Heading';
import SpinButton from './SpinButton';
import store from '../store';
import Paragraph from './Paragraph';
import type { Pokemon, PokemonID } from '../types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },

  image: {    
    resizeMode: 'contain',
  },


  text: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#222',
  },

  value: {
    marginHorizontal: 4,
  },

  small: {
    fontSize: 11,
  },

  amount: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    margin: 4,
  },

  spinbutton: {
    marginVertical: 12,
    width: 120,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  pokemon: {
    marginVertical: 8,
    width: 120,
    alignItems: 'center',
  },
});

type Props = {
  pokemon: Pokemon,
  navigation: Object,
};

type State = {
  value: number,
};

export default class CPCalculator extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: Math.round(this.props.pokemon.points.max_cp / 2),
    };
  }

  state: State;

  _goToPokemon = (pokemonId: PokemonID) => {
    this.props.navigation.navigate('Info', {
      pokemonId,
    });
  };

  _handleChangeValue = (value: number) => {
    this.setState({
      value,
    });
  };

  render() {
    const { pokemon } = this.props;
    const icon = store.getSprite(57);    
    const pokemons = store.getPokemons();    
    return (
      <View {...this.props}>
      
        <Heading>Do You Know?</Heading>        
        <View style={styles.container}>
         <Paragraph><Image style={styles.image} source={icon}/> {pokemon.ff}</Paragraph>
         <Paragraph><Image style={styles.image} source={icon}/> {pokemon.ff1}</Paragraph>
         <Paragraph><Image style={styles.image} source={icon}/> {pokemon.ff2}</Paragraph>
         <Paragraph><Image style={styles.image} source={icon}/> {pokemon.ff3}</Paragraph>
         <Paragraph><Image style={styles.image} source={icon}/> {pokemon.ff4}</Paragraph>
        </View>
      </View>
    );
  }
}
