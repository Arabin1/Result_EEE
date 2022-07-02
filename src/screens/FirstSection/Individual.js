/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import theme from '../../theme/theme';
import {connect} from 'react-redux';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import YearResult from '../../components/YearResult';
import ExpandCollapse from '../../components/ExpandCollapse';
import SemesterResult from '../../components/SemesterResult';
import {useIsFocused} from '@react-navigation/native';

const Individual = props => {
  const [ygpa1Collapse, setYgpa1Collapse] = useState(true);
  const [ygpa2Collapse, setYgpa2Collapse] = useState(true);
  const [ygpa3Collapse, setYgpa3Collapse] = useState(true);
  const [initialValue, setInitialValue] = useState({});
  const [studentDetails, setStudentDetails] = useState({});
  const isFocused = useIsFocused();
  const searchRef = useRef(null);

  useEffect(() => {
    props.route.params?.studentId
      ? handleInitialValue(props.route.params.studentId)
      : searchRef.current.focus();
    props.route.params ? (props.route.params.studentId = '') : '';
  }, [isFocused]);

  const handleInitialValue = async studentId => {
    searchRef.current.clear();
    const index = props.dataSet.findIndex(data => data.title === studentId);

    const val = {
      id: index + 1,
    };

    setInitialValue(val);
    searchWithStudentId(studentId);
  };

  const handleSelectedItem = item => {
    setYgpa1Collapse(true);
    setYgpa2Collapse(true);
    setYgpa3Collapse(true);
    if (item) {
      item.title.charAt(0) >= '0' && item.title.charAt(0) <= '9'
        ? searchWithStudentId(item.title)
        : searchWithFullName(item.title);
    }
  };

  const searchWithStudentId = studentId => {
    // 1st semester
    let index = props.semester1.findIndex(data => data.studentId === studentId);
    const fullName = props.semester1[index].fullName;
    const semester1 = {
      result: props.semester1[index].semester1,
      merit: index + 1,
    };

    // 2nd semester
    index = props.semester2.findIndex(data => data.studentId === studentId);
    const semester2 = {
      result: props.semester2[index].semester2,
      merit: index + 1,
    };

    // 3rd semester
    index = props.semester3.findIndex(data => data.studentId === studentId);
    const semester3 = {
      result: props.semester3[index].semester3,
      merit: index + 1,
    };

    // 4th semester
    index = props.semester4.findIndex(data => data.studentId === studentId);
    const semester4 = {
      result: props.semester4[index].semester4,
      merit: index + 1,
    };

    // 5th semester
    index = props.semester5.findIndex(data => data.studentId === studentId);
    const semester5 = {
      result: props.semester5[index].semester5,
      merit: index + 1,
    };

    // 1st year
    index = props.year1.findIndex(data => data.studentId === studentId);
    const year1 = {
      result: props.year1[index].year1,
      merit: index + 1,
    };

    // 2nd year
    index = props.year2.findIndex(data => data.studentId === studentId);
    const year2 = {
      result: props.year2[index].year2,
      merit: index + 1,
    };

    // 3rd year
    index = props.semester5.findIndex(data => data.studentId === studentId);
    const year3 = {
      result: props.semester5[index].semester5,
      merit: index + 1,
    };

    // cgpa
    index = props.cgpa.findIndex(data => data.studentId === studentId);
    const cgpa = {
      result: props.cgpa[index].cgpa,
      merit: index + 1,
    };

    // finally, set the student details
    setStudentDetails({
      ...studentDetails,
      studentId,
      fullName,
      semester1,
      semester2,
      semester3,
      semester4,
      semester5,
      year1,
      year2,
      year3,
      cgpa,
    });
  };

  const searchWithFullName = fullName => {
    // 1st semester
    let index = props.semester1.findIndex(data => data.fullName === fullName);
    const studentId = props.semester1[index].studentId;
    const semester1 = {
      result: props.semester1[index].semester1,
      merit: index + 1,
    };

    // 2nd semester
    index = props.semester2.findIndex(data => data.fullName === fullName);
    const semester2 = {
      result: props.semester2[index].semester2,
      merit: index + 1,
    };

    // 3rd semester
    index = props.semester3.findIndex(data => data.fullName === fullName);
    const semester3 = {
      result: props.semester3[index].semester3,
      merit: index + 1,
    };

    // 4th semester
    index = props.semester4.findIndex(data => data.fullName === fullName);
    const semester4 = {
      result: props.semester4[index].semester4,
      merit: index + 1,
    };

    // 5th semester
    index = props.semester5.findIndex(data => data.fullName === fullName);
    const semester5 = {
      result: props.semester5[index].semester5,
      merit: index + 1,
    };

    // 1st year
    index = props.year1.findIndex(data => data.fullName === fullName);
    const year1 = {
      result: props.year1[index].year1,
      merit: index + 1,
    };

    // 2nd year
    index = props.year2.findIndex(data => data.fullName === fullName);
    const year2 = {
      result: props.year2[index].year2,
      merit: index + 1,
    };

    // 3rd year
    index = props.semester5.findIndex(data => data.fullName === fullName);
    const year3 = {
      result: props.semester5[index].semester5,
      merit: index + 1,
    };

    // cgpa
    index = props.cgpa.findIndex(data => data.fullName === fullName);
    const cgpa = {
      result: props.cgpa[index].cgpa,
      merit: index + 1,
    };

    // finally, set the student details
    setStudentDetails({
      ...studentDetails,
      studentId,
      fullName,
      semester1,
      semester2,
      semester3,
      semester4,
      semester5,
      year1,
      year2,
      year3,
      cgpa,
    });
  };

  const CGPAComponent = () => {
    return (
      <SemesterResult
        dataSource={studentDetails}
        resultOf={'cgpa'}
        title={studentDetails.fullName}>
        <Text style={styles.title}>ID : </Text>
        <Text style={styles.regularText}>{studentDetails.studentId}</Text>
      </SemesterResult>
    );
  };

  const YGPA1Component = () => {
    return (
      <YearResult
        dataSource={studentDetails}
        resultOf={'year1'}
        title={'First Year'}
        collapse={ygpa1Collapse}
        onPressHandler={collapse => setYgpa1Collapse(collapse)}>
        Examination of 2018
      </YearResult>
    );
  };

  const YGPA2Component = () => {
    return (
      <YearResult
        dataSource={studentDetails}
        resultOf={'year2'}
        title={'Second Year'}
        collapse={ygpa2Collapse}
        onPressHandler={collapse => setYgpa2Collapse(collapse)}>
        Examination of 2019
      </YearResult>
    );
  };

  const YGPA3Component = () => {
    return (
      <YearResult
        dataSource={studentDetails}
        resultOf={'year3'}
        title={'Third Year'}
        collapse={ygpa3Collapse}
        onPressHandler={collapse => setYgpa3Collapse(collapse)}>
        Examination of 2020
      </YearResult>
    );
  };

  return (
    <SafeAreaView style={styles.body}>
      <AutocompleteDropdown
        ref={searchRef}
        closeOnBlur={true}
        clearOnFocus={true}
        closeOnSubmit={true}
        onChangeText={() => setStudentDetails({})}
        initialValue={initialValue}
        onClear={() => searchRef.current.focus()}
        onSelectItem={handleSelectedItem}
        dataSet={props.dataSet}
        suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
        inputContainerStyle={styles.inputContainerStyle}
        textInputProps={{
          placeholder: 'Search with name or id..',
          style: {
            paddingLeft: 18,
            fontFamily: theme.font.Regular,
            fontSize: 15,
            color: theme.textColor2,
          },
        }}
        suggestionsListTextStyle={{
          fontFamily: theme.font.Regular,
          color: theme.textColor3,
        }}
        suggestionsListContainerStyle={{
          backgroundColor: theme.textColor1,
        }}
        ChevronIconComponent={
          <Feather name="chevron-down" size={25} color={theme.borderColor} />
        }
        ClearIconComponent={
          <Feather name="x-circle" size={22} color={theme.borderColor} />
        }
      />
      {studentDetails.studentId ? (
        <>
          <ScrollView>
            <CGPAComponent />
            <ExpandCollapse
              collapse={ygpa1Collapse}
              headerComponent={<YGPA1Component />}>
              <SemesterResult
                dataSource={studentDetails}
                resultOf={'semester1'}
                title={'Odd Semester'}>
                Examination of 2018
              </SemesterResult>
              <SemesterResult
                dataSource={studentDetails}
                resultOf={'semester2'}
                title={'Even Semester'}>
                Examination of 2018
              </SemesterResult>
            </ExpandCollapse>
            <ExpandCollapse
              collapse={ygpa2Collapse}
              headerComponent={<YGPA2Component />}>
              <SemesterResult
                dataSource={studentDetails}
                resultOf={'semester3'}
                title={'Odd Semester'}>
                Examination of 2019
              </SemesterResult>
              <SemesterResult
                dataSource={studentDetails}
                resultOf={'semester4'}
                title={'Even Semester'}>
                Examination of 2019
              </SemesterResult>
            </ExpandCollapse>
            <ExpandCollapse
              collapse={ygpa3Collapse}
              headerComponent={<YGPA3Component />}>
              <SemesterResult
                dataSource={studentDetails}
                resultOf={'semester5'}
                title={'Odd Semester'}>
                Examination of 2020
              </SemesterResult>
            </ExpandCollapse>
          </ScrollView>
        </>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: theme.appBackground,
    padding: 10,
  },
  inputContainerStyle: {
    backgroundColor: theme.textColor1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: theme.borderColor,
    borderWidth: 1,
    marginBottom: 15,
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
});

const mapStateToProps = ({resultManager}) => {
  const {
    dataSet,
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
    dataSet,
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

export default connect(mapStateToProps)(Individual);
