import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';

import mealsReducer from "./store/reducers/meals";
import MealsNavigator from "./navigration/MealsNavigration";

const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
};

export default function App() {
  const [isLoad,setLoad] = useState(false);
  if(!isLoad){
    return <AppLoading startAsync={fetchFonts} onFinish={() => setLoad(true)}/>
  }
  return (
      <Provider store={store}>
        <MealsNavigator/>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
