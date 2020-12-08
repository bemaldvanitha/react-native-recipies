import React,{useEffect,useCallback} from 'react';
import {View,Text,StyleSheet,Button,ScrollView,Image} from 'react-native';
import {MEALS} from '../data/dummy-data';
import {useSelector,useDispatch} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import Colors from "../constants/Colors";
import {toggleFavorite} from '../store/actions/mealsAction';

const MealDetailScreen = (props) => {
    const id = props.navigation.getParam('mealId');
    const allMeals = useSelector(state => state.meals.meals);

    const dispatch = useDispatch();

    const IsCurrentMealsFav = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === id));

    const toggleFavoriteHandle =useCallback( () => {
        dispatch(toggleFavorite(id));
    },[dispatch,id]);

    const food = allMeals.find((m) => m.id === id);
    useEffect(() => {
        props.navigation.setParams({toggleFav: toggleFavoriteHandle});
        props.navigation.setParams({mealTitle: food.title});
        props.navigation.setParams({isFav: IsCurrentMealsFav});
    },[food,toggleFavorite,IsCurrentMealsFav]);

    return(
        <ScrollView>
            <Image source={{uri: food.imageUrl}} style={styles.image}/>
            <View style={styles.details}>
                <Text style={{fontFamily: 'open-sans'}}>{food.duration}</Text>
                <Text style={{fontFamily: 'open-sans'}}>{food.complexity.toUpperCase()}</Text>
                <Text style={{fontFamily: 'open-sans'}}>{food.affordability.toUpperCase()}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Ingredients</Text>
                {food.ingredients.map(ingredient => {
                    return(
                        <Text key={ingredient} style={styles.listItem}>{ingredient}</Text>
                    )
                })}
                <Text style={styles.title}>Steps</Text>
                {food.steps.map(step => {
                    return(
                        <Text key={step} style={styles.listItem}>{step}</Text>
                    )
                })}
            </View>
        </ScrollView>
    )
};

MealDetailScreen.navigationOptions = navigationData => {
  const id = navigationData.navigation.getParam('mealId');
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const IsFav = navigationData.navigation.getParam('isFav');
  return{
      headerTitle: mealTitle,
      headerRight: () => (
          <Ionicons name={IsFav ? 'ios-star': 'ios-star-outline'} size={23} color="white" onPress={toggleFavorite}/>
      )
  }
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonStyle: {
        fontSize: 23,
        color: 'white'
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize:  24,
    },
    image: {
        width: '100%',
        height: 200
    },
    container: {
        marginHorizontal: 20,
        marginVertical: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    listItem:{
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginTop: 15,
        borderRadius: 10
    }
});

export default MealDetailScreen;