/* @flow */

import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Animated, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import store from '../store';
import type { Pokemon } from '../types';
const logo = store.getSprite(55);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1948A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  text:{
    color:'#FDFEFE',
    fontFamily: 'galada',
    fontSize: 40,
    margin:15,
  },
  backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      justifyContent: 'center',
      alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#808B96',
    opacity: 0.6,
  }

});
class ImageLoader extends PureComponent<Props, State> {
  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.80, 1],
                })
              },
            ],
          },
          this.props.style,
        ]}
      />
    );
  }
}

export default class Splash extends PureComponent<Props, void> {

  render() {
    return (

      <View style={styles.container}>      
      <Text style={styles.text}>Know Your Tea</Text>     
      <ImageLoader style={styles.image} source={logo}/>
      </View>

      // <Image source={background} style={styles.backgroundImage}>
      //   <View style={styles.overlay}/>
      //   <Text style={styles.text}>Know Your Tea</Text>     
      // <ImageLoader style={styles.image} source={logo}/>
      // </Image>
    
    );
  }

  componentDidMount() {
    setTimeout(() => {
      
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Main' })],
      });
      this.props.navigation.dispatch(resetAction);
          }, 3000);

  }
}
