import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import PropTypes from 'prop-types';

const MySnackbar = props => {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={props.visible}
        onDismiss={props.onDismiss}
        action={{
          label: 'OK',
          onPress: props.onUndoButtonPressed,
        }}>
        {props.children}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

Snackbar.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  duration: PropTypes.number,
  onDismiss: PropTypes.func,
  onUndoButtonPressed: PropTypes.func,
};

Snackbar.defaultProps = {
  duration: 5000,
  onDismiss: () => {},
  onUndoButtonPressed: () => {},
};

export default MySnackbar;
