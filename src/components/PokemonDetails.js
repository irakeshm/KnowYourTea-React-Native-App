/* @flow */

import difference from 'lodash/difference';
import React, { PureComponent } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import Heading from './Heading';
import Paragraph from './Paragraph';
import ProgressBar from './ProgressBar';
import PokemonTypeLabel from './PokemonTypeLabel';
import Attack from './Attack';
import Evolution from './Evolution';
import getQuickAttacks from '../utils/getQuickAttacks';
import getSpecialAttacks from '../utils/getSpecialAttacks';
import getStrongAgainstTypes from '../utils/getStrongAgainstTypes';
import getWeakAgainstTypes from '../utils/getWeakAgainstTypes';
import getResistantToTypes from '../utils/getResistantToTypes';
import store from '../store';
import type { Pokemon, PokemonID, Move } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    padding: 16,
  },

  item: {
    marginVertical: 8,
  },

  text: {
    color: '#222',
    fontFamily: 'Montserrat',
    fontSize: 13,
  },
  text1: {
    color: '#222',
    fontFamily: 'Montserrat',
    fontSize: 10,
  },

  strong: {
    fontFamily: 'Montserrat-SemiBold',
  },

  row: {
    flexDirection: 'row',
    marginVertical: 4,
  },

  origin: {
    marginVertical: 10,
  },

  term: {
    marginVertical: 2,
  },

  wrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: -4,
  },

  center: {
    alignItems: 'center',
  },

  measurement: {
    width: 120,
  },
  image1: {    
    resizeMode: 'contain',
  },

  label: {
    width: 120,
  },

  amount: {
    textAlign: 'right',
    width: 80,
  },
  image: {
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#5e5e5e',
    margin:10,
  },
});

type Props = {
  pokemon: Pokemon,
  style?: any,
  navigation: Object,
};

export default class PokemonDetails extends PureComponent<Props, void> {
  _goToPokemon = (pokemonId: PokemonID) => () => {
    this.props.navigation.navigate('Info', {
      pokemonId,
    });
  };

  _renderStat = (
    type: string,
    ratio: number,
    amount: string | number,
    fill: string
  ) => {
    return (
      <View style={[styles.row, styles.center]}>
        <Text style={[styles.text, styles.label]}>{type}</Text>
        <ProgressBar ratio={ratio || 0} fillColor={fill} />
        <Text style={[styles.text1, styles.amount]}>{amount}mg/100 ml</Text>
      </View>
    );
  };

  _renderAttack = (move: Move) => {
    return (
      <Attack
        key={move.name}
        style={styles.row}
        move={move}
        types={this.props.pokemon.types}
      />
    );
  };

  render() {
    const { pokemon } = this.props;
    const maxValues = store.getMaxValues();
    const quickAttacks = getQuickAttacks(pokemon);
    const specialAttacks = getSpecialAttacks(pokemon);
    const strongAgainstAll = getStrongAgainstTypes(pokemon);
    const weakAgainstAll = getWeakAgainstTypes(pokemon);
    const resistantToAll = getResistantToTypes(pokemon);
    const strongAgainst = difference(strongAgainstAll, weakAgainstAll);
    const weakAgainst = difference(weakAgainstAll, strongAgainstAll);
    const resistantTo = difference(resistantToAll, [
      ...weakAgainst,
      ...strongAgainst,
    ]); 
    const Teaimage = store.getImage(pokemon.id);
    const Teaimage1 = store.getImage1(pokemon.id);
    const icon = store.getSprite(56); 
    return (
      <ScrollView {...this.props} style={[styles.container, this.props.style]}>
        <View style={styles.content}>
          <View style={styles.item}>
            <Heading selectable>{pokemon.category}</Heading>
            <Paragraph>{pokemon.description}</Paragraph>
            <Paragraph>{pokemon.description1}</Paragraph>
            <Paragraph>{pokemon.description2}</Paragraph>
            <View style={styles.center}>
            <Image style={styles.image} source={Teaimage} />
            </View>
            <Paragraph>{pokemon.description3}</Paragraph>
          </View>
          <View style={styles.item}>
            <View style={[styles.row, styles.center]}>
              <Heading selectable>Constituent of {pokemon.category}</Heading>         
            </View>            
          </View>
          <View style={styles.item}>
            {this._renderStat(
              'Caffeine',
              pokemon.stats.attack / 100,
              pokemon.stats.attack,
              '#ff8a65'
            )}
            {this._renderStat(
              'Catechins',
              pokemon.stats.defense / 100,
              pokemon.stats.defense,
              '#9575cd'
            )}
            {this._renderStat(
              'Vitamins',
              pokemon.stats.stamina / maxValues.stamina,
              pokemon.stats.stamina,
              '#5499c7'
            )}            
            {this._renderStat(
              'Water',
              pokemon.points.max_cp / 100,
              pokemon.points.max_cp,
              '#e57373'
            )}
          </View>
          
          <View style={styles.item}>
            <Heading selectable>Benefits of {pokemon.category}</Heading>
            <Paragraph><Image style={styles.image1} source={icon} /> {pokemon.Benefit}</Paragraph>
            <Paragraph><Image style={styles.image1} source={icon} /> {pokemon.Benefit1}</Paragraph>
            <Paragraph><Image style={styles.image1} source={icon} /> {pokemon.Benefit2}</Paragraph>
            <Paragraph><Image style={styles.image1} source={icon} /> {pokemon.Benefit3}</Paragraph>            
            <View style={styles.center}>
            <Image style={styles.image} source={Teaimage1} />
            </View>
            <Paragraph><Image style={styles.image1} source={icon} /> {pokemon.Benefit4}</Paragraph>
          </View>
        
        </View>
      </ScrollView>
    );
  }
}
