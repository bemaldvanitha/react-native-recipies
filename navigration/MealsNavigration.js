import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Ionicons} from '@expo/vector-icons';

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import Favoritescreen from "../screens/Favoritescreen";
import {Platform} from "react-native";
import Colors from "../constants/Colors";
import FilterScreen from "../screens/FiltersScreen";

const MealsNavigator= createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: {
       screen: CategoryMealsScreen
    },
    MealDetail: {
        screen: MealDetailScreen
    }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor: 'white'
        },
        headerTitleStyle: {
          fontFamily: 'open-sans-bold'
        },
        headerTintColor: Platform.OS === 'android'? 'white' : Colors.primaryColor
    }
});

const FavNavigrator = createStackNavigator({
   Favorites: Favoritescreen,
   MealDetails: MealDetailScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor: 'white'
        },
        headerTintColor: Platform.OS === 'android'? 'white' : Colors.primaryColor
    }
});


const MealsFavNavigrator = createBottomTabNavigator({
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name="ios-restaurant" size={24} color={tabInfo.tintColor}/>
                )
            },
        }
    },
    Favorite:{
        screen: FavNavigrator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name="ios-star" size={24} color={tabInfo.tintColor}/>
                )
            },
        }
    }
},{
    tabBarOptions: {
        activeTintColor: Colors.accentColor,
    }
});

const filterNavigation = createStackNavigator({
    filters: FilterScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor: 'white'
        },
        headerTintColor: Platform.OS === 'android'? 'white' : Colors.primaryColor
    }
});

const mainNavigrator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavNavigrator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    FilterData: filterNavigation
},{
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontSize: 24
        }
    }
});

export default createAppContainer(mainNavigrator);