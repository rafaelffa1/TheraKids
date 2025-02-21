import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, View, Text } from 'react-native';

import QuestionnaireScreen from './app/screens/QuestionnaireScreen';
import EvaluationDiagnostic from './app/screens/EvaluationDiagnostic';

const HomeStack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const RootStack = createNativeStackNavigator();


// Home stack navigator
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" options={{ headerShown: false }} component={QuestionnaireScreen} />
      <HomeStack.Screen name="EvaluationDiagnostic" options={{ headerShown: false }} component={EvaluationDiagnostic} />
    </HomeStack.Navigator>
  );
}

// Screens for the bottom tabs
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }} >Home Screen</Text>
      <Button title="Open Modal" onPress={() => navigation.navigate('Modal')} />
      <Button title="Go to Example 1" onPress={() => navigation.navigate('Example1')} />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }} >Settings Screen</Text>
    </View>
  );
}

// Modal screen
function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }} >This is a modal</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

// Bottom tabs navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: '#FAFAFA' }}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false, tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
        }}
        component={HomeStackNavigator} />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false, tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

// Bottom tabs navigator
function Example1({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }} >Example1</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

// Main stack navigator with modal
function RootStackNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      <RootStack.Screen name="Modal" component={ModalScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          headerShown: false
        }} />
    </RootStack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}


export default App;
