import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import theme from '../theme/theme';

const ExpandCollapse = props => {
  return (
    <>
      {props.headerComponent}
      {props.collapse ? null : props.children}
    </>
  );
};

ExpandCollapse.propTypes = {
  collapse: PropTypes.bool.isRequired,
  headerComponent: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
    borderRadius: 15,
  },
});

export default ExpandCollapse;
