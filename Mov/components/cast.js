import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { fallbackPersonImage, image185 } from '../API/moviedb';

export default function Cast({cast, navigation}){
    let personName = "Keanu Reevs";
    let characterName = "Jones Wickers";
    return (
        <View className="my-6">
            <Text className="text-white text-lg mx-4 mb-5">Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 15}}>
                {cast && cast.map((person, index) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Person', person)} key={index} className="mr-4 items-center">
                            <View className="overflow-hidden rounded-full h-20 w-20 item-center border border-neutral-500">
                                <Image className="h-24 w-20" source={{uri: image185(person?.profile_path) || fallbackPersonImage}}/>
                            </View>
                            <Text className="text-white text-xs mt-1">
                                {person?.character.length > 10? person?.character.slice(0,10) + '...': person?.character}
                            </Text>
                            <Text className="text-neutral-400 text-xs mt-1">
                                {person?.original_name.length > 10? person?.original_name.slice(0,10) + '...': person?.original_name}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}