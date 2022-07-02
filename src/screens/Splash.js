/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import theme from '../theme/theme';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 1000);
  }, []);

  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />
      <Text style={styles.quote}>Learning never exhausts the mind.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.headerBackground,
    padding: 10,
  },
  logo: {
    width: 182,
    height: 117,
  },
  quote: {
    fontSize: 13,
    marginTop: 2,
    color: theme.textColor1,
    textAlign: 'center',
    fontFamily: theme.font.Italic,
  },
  text: {
    color: theme.textColor1,
    fontSize: 18,
    fontFamily: theme.font.Regular,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Splash;
