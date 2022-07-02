import React, {useState} from 'react';
import {Text, StyleSheet, TextInput, ScrollView, View} from 'react-native';
import theme from '../../theme/theme';
import CustomButton from '../../components/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import {useValidation} from 'react-native-form-validator';
import {EMAIL_API} from '@env';
import axios from 'axios';
import MySnackbar from '../../components/Snakbar';

const Contacts = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [prevEmail, setPrevEmail] = useState('');

  const {validate, isFieldInError, getErrorsInField} = useValidation({
    state: {name, email, comment},
  });

  const onSubmit = async () => {
    setLoading(true);
    const isValidated = validate({
      name: {minlength: 3, maxlength: 50, required: true},
      email: {email: true, required: true},
      comment: {minlength: 16, maxLength: 500, required: true},
    });

    if (isValidated) {
      if (email === prevEmail) {
        setSnackbarMessage(
          'We got your comment. Please try again later or try with another email.',
        );
        setSnackbarVisible(true);
      } else {
        let axiosConfig = {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        };

        const data = JSON.stringify({
          name,
          email,
          message: comment,
        });

        await axios
          .post(EMAIL_API, data, axiosConfig)
          .then(() => {
            setSnackbarMessage(
              'Your comments was successfully sent. Thank you for contacting us.',
            );
            setSnackbarVisible(true);
            setPrevEmail(email);
          })
          .catch(error => {
            setLoading(false);
            console.log(error);
            setSnackbarMessage('You will need internet connection for this.');
            setSnackbarVisible(true);
          });
      }
    }
    setLoading(false);
  };

  return (
    <View style={styles.body}>
      <ScrollView>
        <Text style={styles.regularText}>Name:</Text>
        <TextInput
          value={name}
          onChangeText={value => {
            setName(value);
            validate({
              name: {minlength: 3, maxlength: 50, required: true},
            });
          }}
          placeholderTextColor={theme.borderColor}
          placeholder={'Your name...'}
          style={styles.input}
        />
        {isFieldInError('name') &&
          getErrorsInField('name').map((errorMessage, i) =>
            i === 0 ? (
              <Text key={i} style={styles.dangerText}>
                {errorMessage}
              </Text>
            ) : null,
          )}
        <Text style={styles.regularText}>Email:</Text>
        <TextInput
          value={email}
          onChangeText={value => {
            setEmail(value);
            validate({
              email: {email: true, required: true},
            });
          }}
          placeholderTextColor={theme.borderColor}
          placeholder={'Your email...'}
          style={styles.input}
          keyboardType={'email-address'}
        />
        {isFieldInError('email') &&
          getErrorsInField('email').map((errorMessage, i) =>
            i === 0 ? (
              <Text key={i} style={styles.dangerText}>
                {errorMessage}
              </Text>
            ) : null,
          )}
        <Text style={styles.regularText}>Comment:</Text>
        <TextInput
          value={comment}
          onChangeText={value => {
            setComment(value);
            validate({
              comment: {minlength: 16, maxLength: 500, required: true},
            });
          }}
          placeholderTextColor={theme.borderColor}
          placeholder={'Your comments...'}
          style={styles.comment}
          multiline={true}
          numberOfLines={5}
        />
        {isFieldInError('comment') &&
          getErrorsInField('comment').map((errorMessage, i) =>
            i === 0 ? (
              <Text key={i} style={styles.dangerText}>
                {errorMessage}
              </Text>
            ) : null,
          )}
        <CustomButton
          handleOnPress={onSubmit}
          style={styles.button}
          loading={loading}
          loadingMessage={'Sending'}>
          <Text>Send </Text>
          <Feather name={'send'} size={20} color={theme.textColor1} />
        </CustomButton>
      </ScrollView>
      <MySnackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        onUndoButtonPressed={() => setSnackbarVisible(false)}>
        {snackbarMessage}
      </MySnackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 5,
    backgroundColor: theme.appBackground,
  },
  input: {
    borderWidth: 0.5,
    borderColor: theme.borderColor,
    margin: 5,
    color: theme.textColor2,
    backgroundColor: theme.textColor1,
    fontFamily: theme.font.Regular,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'center',
  },
  comment: {
    borderWidth: 0.5,
    borderColor: theme.borderColor,
    margin: 5,
    color: theme.textColor2,
    backgroundColor: theme.textColor1,
    fontFamily: theme.font.Regular,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
  },
  regularText: {
    color: theme.textColor2,
    fontFamily: theme.font.Regular,
    fontSize: 15,
    marginLeft: 8,
    marginTop: 3,
    marginBottom: -1,
  },
  dangerText: {
    color: theme.dangerColor,
    fontFamily: theme.font.Italic,
    fontSize: 14,
    marginLeft: 8,
    marginTop: -3,
  },
  button: {
    marginTop: 10,
  },
});

export default Contacts;
