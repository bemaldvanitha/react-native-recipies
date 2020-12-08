import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, StyleSheet, Button,FlatList} from 'react-native';

import {CATEGORIES,MEALS} from '../data/dummy-data';
import MealItem from "../components/MealItem";

const CategoryMealsScreen = (props) => {
    const  catId = props.navigation.getParam('categoryId');

    const  availableMeals = useSelector(state => state.meals.filteredMeals);

    const displayMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

    return(
        <View style={styles.screen}>
            <FlatList keyExtractor={(item,index) => item.id} style={{width: '100%'}} data={displayMeals} renderItem={(itemData) => {
                return(
                    <MealItem meal={itemData.item} onSelectMeal={() => {
                        props.navigation.navigate({routeName: 'MealDetail',params:{mealId: itemData.item.id}})
                    }}/>
                )
            }}/>
        </View>
    )
};

CategoryMealsScreen.navigationOptions = navigationData => {
    const catId =  navigationData.navigation.getParam('categoryId')
    const selectCat = CATEGORIES.find(cat => cat.id === catId)
    return{
        headerTitle: selectCat.title,
    }
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealsScreen;