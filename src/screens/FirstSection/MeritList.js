/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import theme from '../../theme/theme';
import {connect} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Select, {selectionList} from '../../components/Select';
import CustomButton from '../../components/CustomButton';
import SearchBar from '../../components/SearchBar';
import MySnackbar from '../../components/Snakbar';
import analytics from '@react-native-firebase/analytics';

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
  const [filteredResultData, setFilteredResultData] = useState([]);
  const [totalLoadedData, setTotalLoadedData] = useState(0);
  const [isFinishedData, setIsFinishedData] = useState(false);
  const [resultName, setResultName] = useState('');
  const [selectionName, setSelectionName] = useState(selectionList[0]);
  const [query, setQuery] = useState('');
  const [accessName, setAccessName] = useState('cgpa');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const RESULT_PER_LOAD = 10;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar
          query={query}
          title={'Merit List'}
          handleChangeText={value => handleChangeText(value)}
        />
      ),
    });
  }, [navigation, query]);

  const handleChangeText = value => {
    setQuery(value);
    const lowerCase = value.toLowerCase();
    const filteredData = originalData.filter(data => {
      return (
        data.studentId.toLowerCase().indexOf(lowerCase) >= 0 ||
        data.fullName.toLowerCase().indexOf(lowerCase) >= 0
      );
    });
    setFilteredResultData(filteredData);

    setResultData([...filteredData.slice(0, RESULT_PER_LOAD)]);

    setTotalLoadedData(RESULT_PER_LOAD);
    setIsFinishedData(filteredData.length <= RESULT_PER_LOAD);
  };

  const handleSelection = selectedValue => {
    setSelectionName(selectedValue);
    if (selectedValue !== selectionList[0]) {
      switch (selectedValue) {
        case selectionList[1]:
          handleResultData(cgpa);
          logResultNameToAnalytics('cgpa').then(res => console.log(res));
          setAccessName('cgpa');
          setResultName('CGPA');
          break;
        case selectionList[2]:
          handleResultData(semester1);
          logResultNameToAnalytics('semester 1').then(res => console.log(res));
          setAccessName('semester1');
          setResultName('GPA');
          break;
        case selectionList[3]:
          handleResultData(semester2);
          logResultNameToAnalytics('semester 2').then(res => console.log(res));
          setAccessName('semester2');
          setResultName('GPA');
          break;
        case selectionList[4]:
          handleResultData(year1);
          logResultNameToAnalytics('year 1').then(res => console.log(res));
          setAccessName('year1');
          setResultName('YGPA');
          break;
        case selectionList[5]:
          handleResultData(semester3);
          logResultNameToAnalytics('semester 3').then(res => console.log(res));
          setAccessName('semester3');
          setResultName('GPA');
          break;
        case selectionList[6]:
          handleResultData(semester4);
          logResultNameToAnalytics('semester 4').then(res => console.log(res));
          setAccessName('semester4');
          setResultName('GPA');
          break;
        case selectionList[7]:
          handleResultData(year2);
          logResultNameToAnalytics('year2').then(res => console.log(res));
          setAccessName('year2');
          setResultName('YGPA');
          break;
        case selectionList[8]:
          handleResultData(semester5);
          logResultNameToAnalytics('semester 5').then(res => console.log(res));
          setAccessName('semester5');
          setResultName('GPA');
      }
      setSnackbarVisible(true);
    }
  };

  const handleResultData = data => {
    setOriginalData(data);
    setFilteredResultData(data);
    setResultData(data.slice(0, RESULT_PER_LOAD));
    setTotalLoadedData(RESULT_PER_LOAD);
    setIsFinishedData(false);
    setQuery('');
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
    setLoading(false);
    setIsFinishedData(
      totalLoadedData + RESULT_PER_LOAD >= filteredResultData.length,
    );
  };

  const FinishedComponent = () => {
    return (
      <View style={styles.end}>
        <Text style={styles.cgText}>End of the List</Text>
      </View>
    );
  };

  const logResultNameToAnalytics = async name => {
    await analytics().logEvent('resultName', {name});
  };

  return (
    <View style={styles.body}>
      <Select handleSelection={handleSelection} />
      {selectionName === selectionList[0] ? (
        <View style={styles.dangerContainer}>
          <Text style={styles.dangerText}>
            Please select any result to see merit list.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={resultData}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('Individual', {
                    studentId: item.studentId,
                  });
                }}>
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
                    <Text style={styles.title} numberOfLines={1}>
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
        </>
      )}
      <MySnackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        onUndoButtonPressed={() => setSnackbarVisible(false)}>
        Showing merit list based on {selectionName} result
      </MySnackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 5,
    flex: 1,
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
