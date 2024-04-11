import {Dimensions, Text, TouchableWithoutFeedback, View, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import { image500 } from '../API/moviedb';
import React from 'react';

var {width, height} = Dimensions.get('window');
export default function TrendingMovies({data}) {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie', item);
    }

    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
            <Carousel data={data}
                renderItem={({ item }) => <MoviesCard item={item} handleClick={handleClick} />}
                firstItem={1}
                inactiveSlideOpacity={0.6}
                sliderWidth={width}
                itemWidth={width*0.65}
                slideStyle={{ display: 'flex', alignItems: 'center' }} />
        </View>
    )
}

const MoviesCard = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image source = {{uri: image500(item.poster_path)}} 
                style={{width: width*0.6, height: height*0.4 }}
                className="rounded-3xl"
            />
        </TouchableWithoutFeedback>
    )
}