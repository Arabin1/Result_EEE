import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import theme from '../theme/theme';
import {Searchbar} from 'react-native-paper';
import PropTypes from 'prop-types';
import Entypo from 'react-native-vector-icons/Entypo';

const MySearchBar = props => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchRef = useRef(null);

  return (
    <>
      {showSearchBar ? (
        <View style={styles.row1}>
          <Searchbar
            style={styles.searchBar}
            inputStyle={styles.inputStyle}
            inputRef={searchRef}
            value={props.query}
            placeholder={'Enter name or id to filter...'}
            onChangeText={query => {
              props.handleChangeText(query);
            }}
          />
          <TouchableOpacity
            style={styles.cross}
            activeOpacity={0.6}
            onPress={() => setShowSearchBar(false)}>
            <Entypo
              color={theme.appBackground}
              size={30}
              name={'circle-with-cross'}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.row2}>
          <Text style={styles.text}>{props.title}</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              if (showSearchBar) {
                searchRef.current.clear();
              }
              setShowSearchBar(true);
              showSearchBar ? searchRef.current.focus() : '';
            }}>
            <FontAwesome5 name={'search'} size={20} color={theme.textColor1} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    alignSelf: 'stretch',
  },
  row1: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row2: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cross: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  text: {
    fontFamily: theme.font.SemiBold,
    color: theme.textColor1,
    fontSize: 18,
  },
  searchBar: {
    flex: 1,
    backgroundColor: theme.appBackground,
    borderRadius: 20,
    alignItems: 'center',
  },
  inputStyle: {
    fontFamily: theme.font.Regular,
    flex: 1,
    color: theme.textColor2,
    marginLeft: -9,
    fontSize: 14,
  },
});

MySearchBar.propTypes = {
  handleChangeText: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};

export default MySearchBar;
