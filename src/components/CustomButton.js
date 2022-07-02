import React from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import theme from '../theme/theme';

const CustomButton = props => {
  return (
    <Pressable
      onPress={props.handleOnPress}
      hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}
      android_ripple={{color: theme.rippleColor}}
      style={({pressed}) => [
        {backgroundColor: pressed ? '#dddddd' : props.color},
        styles.button,
        {...props.style},
      ]}>
      {props.loading ? (
        <View style={styles.indicatorContainer}>
          <Text style={styles.text}>{props.loadingMessage} </Text>
          <ActivityIndicator size="large" color={theme.textColor1} />
        </View>
      ) : (
        <Text style={styles.text}>{props.children}</Text>
      )}
    </Pressable>
  );
};

CustomButton.propTypes = {
  handleOnPress: PropTypes.func,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
};

CustomButton.defaultProps = {
  handleOnPress: () => {},
  color: theme.headerBackground,
  loading: false,
  loadingMessage: 'Please wait...',
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 5,
  },
  text: {
    fontFamily: theme.font.Regular,
    color: theme.textColor1,
    fontSize: 15,
    marginRight: 3,
    textAlign: 'center',
  },
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default CustomButton;
