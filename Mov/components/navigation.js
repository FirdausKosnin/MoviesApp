import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PersonScreen from '../screen/PersonScreen';
import SearchScreen from '../screen/SearchScreen';
import MovieScreen from '../screen/MovieScreen';
import HomeScreen from '../screen/HomeScreen';
import * as React from 'react';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Movie" options={{headerShown: false}} component={MovieScreen} />
        <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen} />
        <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}