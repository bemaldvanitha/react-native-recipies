import React from 'react';
import {View,Text,StyleSheet,Button,FlatList,TouchableOpacity,Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import {CATEGORIES} from '../data/dummy-data';
import CategoryGridTile from "../components/CategoryGridTile";

const CategoriesScreen = (props) => {
  return(
      <FlatList keyExtractor={(item,index) => item.id} numColumns={2} data={CATEGORIES} renderItem={(itemData) => {
          return(
              <CategoryGridTile color={itemData.item.color} title={itemData.item.title} onSelect={() => {
                  props.navigation.navigate({routeName: 'CategoryMeals',params: {categoryId: itemData.item.id}})
              }}/>
          )
      }}/>
  )
};

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meal Category',
        headerLeft: () => (
            <Ionicons name="ios-menu" size={23} color="white" onPress= {() => {navData.navigation.toggleDrawer()}}/>
        )
    }
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default CategoriesScreen;