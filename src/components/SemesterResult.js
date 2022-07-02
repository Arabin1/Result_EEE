import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import theme from '../theme/theme';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SemesterResult = props => {
  return (
    <View
      style={[
        styles.resultContainer,
        props.resultOf === 'cgpa' ? styles.borderRadius : styles.margin,
        props.resultOf === 'semester2' || props.resultOf === 'semester4'
          ? styles.even
          : '',
      ]}>
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
          <Text style={styles.title}>
            {props.resultOf === 'cgpa' ? 'CGPA : ' : 'GPA : '}
          </Text>
          <Text style={styles.cgText}>
            {props.resultOf === 'cgpa'
              ? props.dataSource[props.resultOf]?.result.toFixed(2)
              : props.dataSource[props.resultOf]?.result.toFixed(3)}
          </Text>
        </Text>
      </View>
    </View>
  );
};

SemesterResult.propTypes = {
  dataSource: PropTypes.object.isRequired,
  resultOf: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  containerStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  resultContainer: {
    backgroundColor: theme.textColor1,
    padding: 5,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  margin: {
    marginLeft: 10,
  },
  even: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  borderRadius: {
    borderRadius: 15,
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

export default SemesterResult;
