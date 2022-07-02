import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Individual from './FirstSection/Individual';
import Range from './FirstSection/Range';
import MeritList from './FirstSection/MeritList';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import dimensions from 'react-native/Libraries/Components/Touchable/BoundingDimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Contact from './SecondSection/Contact';
import About from './SecondSection/About';
import theme from '../theme/theme';

const Drawer = createDrawerNavigator();

const Home = () => {
  const isLargeScreen = dimensions.width >= 768;

  return (
    <Drawer.Navigator
      initialRouteName={'Individual'}
      screenOptions={({route}) => ({
        drawerIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Individual') {
            iconName = 'graduation-cap';
            size = focused ? 25 : 20;
          } else if (route.name === 'Merit List') {
            iconName = 'sort-amount-down';
            size = focused ? 25 : 20;
          } else if (route.name === 'Range') {
            iconName = 'vector-arrange-above';
            size = focused ? 25 : 20;
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Contact') {
            iconName = 'contacts-outline';
            size = focused ? 25 : 20;
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'About') {
            iconName = 'users';
            size = focused ? 25 : 20;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        drawerType: isLargeScreen ? 'permanent' : 'back',
        drawerActiveTintColor: theme.headerBackground,
        drawerInactiveTintColor: theme.textColor2,
        drawerStatusBarAnimation: 'slide',
        drawerLabelStyle: {
          fontSize: 15,
          fontFamily: theme.font.SemiBold,
        },
        headerStyle: {
          backgroundColor: theme.headerBackground,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: theme.font.SemiBold,
        },
        headerTintColor: theme.textColor1,
        headerShown: true,
        swipeEnabled: false,
        drawerStyle: {
          backgroundColor: theme.textColor1,
        },
      })}
      backBehavior="history">
      <Drawer.Screen name={'Individual'} component={Individual} />
      <Drawer.Screen name={'Merit List'} component={MeritList} />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            paddingBottom: 10,
          },
        }}
        name={'Range'}
        component={Range}
      />
      <Drawer.Screen name={'Contact'} component={Contact} />
      <Drawer.Screen name={'About'} component={About} />
    </Drawer.Navigator>
  );
};

export default Home;
