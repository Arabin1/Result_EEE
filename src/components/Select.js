import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import theme from '../theme/theme';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';

export const selectionList = [
  'Please select any result',
  'CGPA',
  '1 - 1',
  '1 - 2',
  '1st Year',
  '2 - 1',
  '2 - 2',
  '2nd Year',
  '3 - 1',
];

const Select = props => {
  const [isFocused, setIsFocused] = useState(false);

  const dropDownIcon = () => {
    if (isFocused) {
      return (
        <Feather name="chevron-down" size={25} color={theme.borderColor} />
      );
    }

    return <Feather name="chevron-up" size={25} color={theme.borderColor} />;
  };

  return (
    <View style={styles.row}>
      <SelectDropdown
        defaultValueByIndex={0}
        defaultButtonText={selectionList[0]}
        data={selectionList}
        onSelect={selectedItem => {
          setIsFocused(false);
          props.handleSelection(selectedItem);
        }}
        buttonTextAfterSelection={selectedItem => {
          return selectedItem;
        }}
        rowTextForSelection={item => {
          return item;
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rowTextStyle={styles.rowTextStyle}
        dropdownStyle={styles.dropDownStyle}
        dropdownBackgroundColor={theme.backgroundColor2}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={styles.buttonTextStyle}
        renderDropdownIcon={dropDownIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.textColor1,
    margin: 3,
    borderRadius: 10,
  },
  dropDownStyle: {
    borderRadius: 10,
  },
  buttonStyle: {
    borderRadius: 8,
    backgroundColor: theme.textColor1,
    flex: 1,
    margin: 2,
    borderWidth: 1,
    borderColor: theme.borderColor,
  },
  buttonTextStyle: {
    fontFamily: theme.font.Regular,
    color: theme.textColor2,
    fontSize: 15,
  },
  rowTextStyle: {
    fontFamily: theme.font.Regular,
    color: theme.textColor2,
    fontSize: 15,
  },
});

Select.propTypes = {
  handleSelection: PropTypes.func.isRequired,
};

export default Select;
