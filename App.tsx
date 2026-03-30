import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AddWordScreen } from './src/screens/AddWordScreen';
import { ReviewScreen } from './src/screens/ReviewScreen';
import { DeleteWordsScreen } from './src/screens/DeleteWordsScreen';

export type RootTabParamList = {
  AddWord: undefined;
  Review: undefined;
  DeleteWords: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}
      >
        <Tab.Screen
          name="AddWord"
          component={AddWordScreen}
          options={{
            title: 'Add Word',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Review"
          component={ReviewScreen}
          options={{
            title: 'Review',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="school-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="DeleteWords"
          component={DeleteWordsScreen}
          options={{
            title: 'Delete Words',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="trash-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
