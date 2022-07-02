/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import theme from '../../theme/theme';
import {connect} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Select, {selectionList} from '../../components/Select';
import CustomButton from '../../components/CustomButton';
import SearchBar from '../../components/SearchBar';

const MeritList = ({
  cgpa,
  year1,
  year2,
  semester1,
  semester2,
  semester3,
  semester4,
  semester5,
  navigation,
}) => {
  const [originalData, setOriginalData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [rangedData, setRangedData] = useState([]);
  const [filteredResultData, setFilteredResultData] = useState([]);
  const [lowestResult, setLowestResult] = useState('');
  const [highestResult, setHighestResult] = useState('');
  const [totalLoadedData, setTotalLoadedData] = useState(0);
  const [isFinishedData, setIsFinishedData] = useState(false);
  const [resultName, setResultName] = useState('');
  const [selectionName, setSelectionName] = useState(selectionList[0]);
  const [query, setQuery] = useState('');
  const [accessName, setAccessName] = useState('cgpa');
  const [loading, setLoading] = useState(false);
  const [totalVisible, setTotalVisible] = useState(false);
  const lowInputRef = useRef(null);
  const highInputRef = useRef(null);

  const RESULT_PER_LOAD = 10;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar
          query={query}
          title={'Range'}
          handleChangeText={value => handleChangeText(value)}
        />
      ),
    });
  }, [navigation, query]);

  const handleChangeText = value => {
    const lowerCase = value.toLowerCase();
    const filteredData = rangedData.filter(data => {
      return (
        data.studentId.toLowerCase().indexOf(lowerCase) >= 0 ||
        data.fullName.toLowerCase().indexOf(lowerCase) >= 0
      );
    });
    setFilteredResultData(filteredData);

    setResultData([...filteredData.slice(0, RESULT_PER_LOAD)]);

    setQuery(value);
    setTotalLoadedData(RESULT_PER_LOAD);
    setIsFinishedData(filteredData.length <= RESULT_PER_LOAD);
  };

  const handleSelection = selectedValue => {
    setQuery('');
    setTotalVisible(false);
    setFilteredResultData([]);
    setLowestResult('');
    setHighestResult('');
    setSelectionName(selectedValue);
    if (selectedValue !== selectionList[0]) {
      switch (selectedValue) {
        case selectionList[1]:
          setOriginalData(cgpa);
          setAccessName('cgpa');
          setResultName('CGPA');
          break;
        case selectionList[2]:
          setOriginalData(semester1);
          setAccessName('semester1');
          setResultName('GPA');
          break;
        case selectionList[3]:
          setOriginalData(semester2);
          setAccessName('semester2');
          setResultName('GPA');
          break;
        case selectionList[4]:
          setOriginalData(year1);
          setAccessName('year1');
          setResultName('YGPA');
          break;
        case selectionList[5]:
          setOriginalData(semester3);
          setAccessName('semester3');
          setResultName('GPA');
          break;
        case selectionList[6]:
          setOriginalData(semester4);
          setAccessName('semester4');
          setResultName('GPA');
          break;
        case selectionList[7]:
          setOriginalData(year2);
          setAccessName('year2');
          setResultName('YGPA');
          break;
        case selectionList[8]:
          setOriginalData(semester5);
          setAccessName('semester5');
          setResultName('GPA');
      }
      lowInputRef.current ? lowInputRef.current.focus() : '';
    }
  };

  const loadMoreData = () => {
    setLoading(true);
    setResultData([
      ...resultData,
      ...filteredResultData.slice(
        totalLoadedData,
        totalLoadedData + RESULT_PER_LOAD,
      ),
    ]);
    setTotalLoadedData(totalLoadedData + RESULT_PER_LOAD);
    setIsFinishedData(
      totalLoadedData + RESULT_PER_LOAD >= filteredResultData.length,
    );
    setLoading(false);
  };

  const FinishedComponent = () => {
    return (
      <View style={styles.end}>
        <Text style={styles.cgText}>End of the List</Text>
      </View>
    );
  };

  const handleSearch = () => {
    if (lowestResult && highestResult) {
      let low = parseFloat(lowestResult);
      let high = parseFloat(highestResult);
      if (low > high) {
        const temp = low;
        low = high;
        high = temp;
      }

      const range = originalData.filter(item => {
        return item[accessName] >= low && item[accessName] <= high;
      });

      setFilteredResultData(range);
      setRangedData(range);
      setTotalLoadedData(RESULT_PER_LOAD);
      setQuery('');
      setTotalVisible(true);
      setResultData(range.slice(0, RESULT_PER_LOAD));
      setIsFinishedData(range.length <= RESULT_PER_LOAD);
    } else {
      lowestResult ? highInputRef.current.focus() : lowInputRef.current.focus();
    }
  };

  return (
    <View style={styles.body}>
      <Select handleSelection={handleSelection} />
      {selectionName === selectionList[0] ? (
        <View style={styles.dangerContainer}>
          <Text style={styles.dangerText}>
            Please select any result to see result within a range.
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.row}>
            <TextInput
              ref={lowInputRef}
              autoFocus={true}
              value={lowestResult}
              onChangeText={value => {
                setQuery('');
                setTotalVisible(false);
                setFilteredResultData([]);
                setLowestResult(value);
              }}
              placeholder={'Lower result'}
              placeholderTextColor={theme.borderColor}
              style={styles.input}
              keyboardType={'numeric'}
            />
            <TextInput
              ref={highInputRef}
              value={highestResult}
              onChangeText={value => {
                setQuery('');
                setTotalVisible(false);
                setFilteredResultData([]);
                setHighestResult(value);
              }}
              placeholder={'Upper result'}
              placeholderTextColor={theme.borderColor}
              style={styles.input}
              keyboardType={'numeric'}
            />
            <CustomButton style={styles.button} handleOnPress={handleSearch}>
              <FontAwesome5
                color={theme.textColor1}
                size={20}
                name={'search'}
              />
            </CustomButton>
          </View>
          {totalVisible ? (
            <View style={styles.total}>
              <Text style={styles.title}>Total : </Text>
              <Text style={styles.cgText}>{filteredResultData.length}</Text>
            </View>
          ) : null}
          {filteredResultData.length > 0 ? (
            <FlatList
              data={resultData}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Individual', {
                      studentId: item.studentId,
                    });
                  }}
                  activeOpacity={0.7}>
                  <View style={styles.resultContainer}>
                    <View style={styles.circle}>
                      <FontAwesome5
                        name={'sort-amount-down'}
                        size={25}
                        color={theme.textColor2}
                      />
                      <Text style={styles.merit}>
                        {item.merit < 10 ? '0' + item.merit : item.merit}
                      </Text>
                    </View>
                    <View style={styles.details}>
                      <Text numberOfLines={1} style={styles.title}>
                        {item.fullName}
                      </Text>
                      <Text>
                        <Text style={styles.title}>ID : </Text>
                        <Text style={styles.regularText}>{item.studentId}</Text>
                      </Text>
                      <Text>
                        <Text style={styles.title}>{resultName} : </Text>
                        <Text style={styles.cgText}>
                          {resultName === 'CGPA'
                            ? item[accessName]?.toFixed(2)
                            : item[accessName]?.toFixed(3)}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={
                isFinishedData ? (
                  <FinishedComponent />
                ) : (
                  <CustomButton
                    loading={loading}
                    loadingMessage={'Loading...'}
                    handleOnPress={loadMoreData}>
                    Load more..
                  </CustomButton>
                )
              }
            />
          ) : null}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 5,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  input: {
    flex: 2,
    borderWidth: 0.5,
    backgroundColor: theme.textColor1,
    fontFamily: theme.font.Regular,
    margin: 2,
    padding: 10,
    borderColor: theme.borderColor,
    borderRadius: 5,
    fontSize: 15,
    color: theme.textColor2,
  },
  button: {
    flex: 1,
    margin: 2,
    borderRadius: 5,
    height: 45,
    marginTop: 0,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.textColor1,
    borderRadius: 15,
    margin: 3,
    padding: 10,
  },
  resultContainer: {
    backgroundColor: theme.textColor1,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3,
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
  dangerText: {
    color: theme.textColor1,
    fontFamily: theme.font.Italic,
    textAlign: 'center',
  },
  dangerContainer: {
    backgroundColor: theme.dangerColor,
    padding: 20,
    marginHorizontal: 3,
    marginVertical: 20,
    borderRadius: 15,
  },
  end: {
    backgroundColor: theme.textColor1,
    padding: 20,
    width: '100%',
    marginTop: 2,
    alignItems: 'center',
  },
});

const mapStateToProps = ({resultManager}) => {
  const {
    semester1,
    semester2,
    semester3,
    semester4,
    semester5,
    year1,
    year2,
    cgpa,
  } = resultManager;

  return {
    semester1,
    semester2,
    semester3,
    semester4,
    semester5,
    year1,
    year2,
    cgpa,
  };
};
export default connect(mapStateToProps)(MeritList);
