import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import { GetActorCreditAPI, GetActorDetailAPI, fallbackPersonImage, image185, image342, image500 } from '../API/moviedb';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import MovieList from '../components/moviesList';
import Loading from '../components/loading';
import { style, theme } from '../theme';

var {width, height} = Dimensions.get('window');
ios = Platform == 'ios';
const verticalMargin = ios? '': 'my-3';
export default function PersonScreen() {
    const {params: item} = useRoute();
    const navigate = useNavigation();

    const [person, setPerson] = useState({});
    const [personMovies, setPersonMovies] = useState([]);
    const [isFavourite, toggleFavourite] = useState(false);

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(false);
        getActorDetailAPI(item.id);
        getActorCreditAPI(item.id);
    },[item])

    const getActorDetailAPI = async id => {
        const data = await GetActorDetailAPI(id);
        if(data) setPerson(data);
    }

    const getActorCreditAPI = async id => {
        const data = await GetActorCreditAPI(id);
        if(data && data.cast) setPersonMovies(data.cast);
    }

    return (
        <ScrollView className="flex bg-neutral-900" contentContainerStyle={{paddingBottom: 20}}>
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4" }>
                    <TouchableOpacity onPress={() => navigate.goBack()} style={style.background} className="rounded-xl p-1">
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size={35} color={ isFavourite? theme.background :"white"}/>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>

            {
                loading? (
                    <Loading/>
                ) : (
                    <View>
                        <View className="flex-row justify-center">
                            <Image source={{uri: image500(person?.profile_path) || fallbackPersonImage}} style={{height: height*0.50, width: width}}/>
                            <LinearGradient colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']} style={{width, height: height*0.4}} 
                                start={{x: 0.5, y:0}}
                                end={{x: 0.5, y:1}}
                                className="absolute bottom-0"/>
                        </View>             
            
                        <View style={{marginTop: -(height*0.10)}}>
                            <Text className="text-white text-center text-3xl font-bold tracking-wider">
                                {person?.name}
                            </Text>
                            <Text className="text-base text-neutral-400 text-center">
                                {person?.place_of_birth}
                            </Text>
                        </View>
            
                        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                            <View className="border-r-2 border-r-neutral-400 pr-2 items-center">
                                <Text className="text-white font-semibold">Gender</Text>
                                <Text className="text-neutral-300 text-sm">{person?.gender==1? 'Female': 'Male'}</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 pr-5 items-center">
                                <Text className="text-white font-semibold">Birthday</Text>
                                <Text className="text-neutral-300 text-sm">{person?.birthday}</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 pr-5 items-center">
                                <Text className="text-white font-semibold">Known As</Text>
                                <Text className="text-neutral-300 text-sm">{person?.known_for_department}</Text>
                            </View>
                            <View className="pr-2 items-center">
                                <Text className="text-white font-semibold">Popularity</Text>
                                <Text className="text-neutral-300 text-sm">{person?.popularity?.toFixed(2)} %</Text>
                            </View>
                        </View>
            
                        <View>
                            <Text className="text-neutral-400 mx-4 text-base text-center tracking-wider my-5">
                                {person?.biography || 'N/A'}
                            </Text>
                        </View>
            
                        {/* Movies Related */}
                        <MovieList title={"Stars"} hideSeeAll={true} data={personMovies}/>
                    </View>
                )
            }

        </ScrollView>
  )
}