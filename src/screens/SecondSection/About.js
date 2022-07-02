import React from 'react';
import {Image, Text, View, StyleSheet, FlatList} from 'react-native';
import theme from '../../theme/theme';
import {connect} from 'react-redux';

const About = ({dataSet}) => {
  const names = dataSet
    .slice(0, dataSet.length / 2)
    .filter(item => item.title !== 'Md. Asaduzzaman');

  const Picture = () => {
    return (
      <Image
        style={styles.image}
        source={require('../../../assets/images/me.jpg')}
      />
    );
  };

  const ListHeader = () => {
    return (
      <>
        <View style={styles.card}>
          <Picture />
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={1}>
              Md. Asaduzzaman Arabin
            </Text>
            <Text style={styles.italicText} numberOfLines={2}>
              Department of EEE, RU (2017-18)
            </Text>
          </View>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>The App is dedicated to --</Text>
        </View>
      </>
    );
  };

  const FinishedComponent = () => {
    return (
      <View style={styles.end}>
        <Text style={styles.italic}>End of the List</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={names}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text style={styles.regularText} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={<FinishedComponent />}
      ListHeaderComponent={<ListHeader />}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.textColor1,
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  details: {
    marginLeft: 10,
    flex: 1,
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
  italicText: {
    fontFamily: theme.font.Italic,
    fontSize: 12,
    color: theme.textColor2,
  },
  item: {
    paddingHorizontal: 20,
    backgroundColor: theme.textColor1,
    padding: 5,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: theme.textColor1,
  },
  italic: {
    fontFamily: theme.font.Italic,
    fontSize: 15,
    color: theme.textColor2,
  },
  end: {
    backgroundColor: theme.textColor1,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

const mapStateToProps = ({resultManager}) => {
  const {dataSet} = resultManager;
  return {dataSet};
};

export default connect(mapStateToProps)(About);
