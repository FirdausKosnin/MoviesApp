import {Dimensions, View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { style } from "../theme";
import React from "react";
import { fallbackMoviePoster, image185 } from "../API/moviedb";

var {width, height} = Dimensions.get('window');
export default function MovieList({title, data, hideSeeAll}) {
    let movieName = 'Jones Weak';
    const navigation = useNavigation();
    
    return (
    <View className="mb-8 space-y-4">
        <View className="mx-4 flex-row justify-between items-center">
            <Text className="text-white text-xl">{title}</Text>

            { !hideSeeAll && (
            <TouchableOpacity>
                <Text style={style.text} className="text-lg">See All</Text>
            </TouchableOpacity>
            )}

        </View>

        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
        >
        {
            data.map((item, index)=>{
                return(
                    <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
                        <View className="space-y-1 mr-4">
                            <Image source={{uri: image185(item.poster_path) || fallbackMoviePoster}} className="rounded-3xl"
                            style={{width: width*0.3, height: height*0.2}} />
                            <Text className="text-neutral-300 ml-1 text-center">
                                {item.title.length>14? item.title.slice(0,14) + '...': item.title}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
            })
        }
        </ScrollView>
    </View>
    )
}