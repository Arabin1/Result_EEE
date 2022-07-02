import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../theme/theme';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

const YearResult = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => props.onPressHandler(!props.collapse)}>
      <View
        style={[styles.resultContainer, props.collapse ? '' : styles.expanded]}>
        <View style={styles.circle}>
          <FontAwesome5
            name={'sort-amount-down'}
            size={25}
            color={theme.textColor2}
          />
          <Text style={styles.merit}>
            {props.dataSource[props.resultOf]?.merit < 10
              ? '0' + props.dataSource[props.resultOf]?.merit
              : props.dataSource[props.resultOf]?.merit}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {props.title}
          </Text>
          <Text style={styles.regularText}>{props.children}</Text>
          <Text>
            <Text style={styles.title}>YGPA : </Text>
            <Text style={styles.cgText}>
              {props.dataSource[props.resultOf]?.result.toFixed(3)}
            </Text>
          </Text>
        </View>
        {props.collapse ? (
          <Feather name="chevron-up" size={25} color={theme.borderColor} />
        ) : (
          <Feather name="chevron-down" size={25} color={theme.borderColor} />
        )}
      </View>
    </TouchableOpacity>
  );
};

YearResult.propTypes = {
  dataSource: PropTypes.object.isRequired,
  resultOf: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  collapse: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  containerStyle: PropTypes.string,
  onPressHandler: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  resultContainer: {
    backgroundColor: theme.textColor1,
    borderRadius: 15,
    padding: 5,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  },
  expanded: {
    borderBottomRightRadius: 0,
  },
  circle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.backgroundColor2,
  },
  merit: {
    fontFamily: theme.font.BoldItalic,
    fontSize: 20,
    paddingLeft: 5,
    color: theme.textColor2,
  },
  details: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontFamily: theme.font.SemiBold,
    fontSize: 15,
    color: theme.textColor2,
  },
  regularText: {
    fontFamily: theme.font.Regular,
    fontSize: 15,
    color: theme.textColor2,
  },
  cgText: {
    fontFamily: theme.font.Italic,
    fontSize: 15,
    color: theme.textColor2,
  },
});

export default YearResult;
