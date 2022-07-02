import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './screens/Splash';
import Home from './screens/Home';
import theme from './theme/theme';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.headerBackground,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 25,
            fontFamily: theme.font.Bold,
          },
        }}>
        <Stack.Screen
          name={'Splash'}
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
