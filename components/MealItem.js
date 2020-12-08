import React from 'react';
import {View,StyleSheet,Text,TouchableOpacity,ImageBackground} from 'react-native';

const MealItem = (props) => {
    return(
        <View style={styles.mealItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <View style={{...styles.mealRow,...styles.mealHeader}}>
                        <ImageBackground source={{uri: props.meal.imageUrl}} style={styles.bgImage}>
                            <Text style={styles.title}>{props.meal.title}</Text>
                        </ImageBackground>
                    </View>
                    <View style={{...styles.mealRow,...styles.mealBody}}>
                        <Text style={{fontFamily: 'open-sans'}}>{props.meal.duration}</Text>
                        <Text style={{fontFamily: 'open-sans'}}>{props.meal.complexity.toUpperCase()}</Text>
                        <Text style={{fontFamily: 'open-sans'}}>{props.meal.affordability.toUpperCase()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    mealRow: {
        flexDirection: 'row'
    },
    mealItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden'
    },
    mealHeader: {
        height: '85%'
    },
    mealBody: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        textAlign: 'center'
    }
});

export default MealItem;