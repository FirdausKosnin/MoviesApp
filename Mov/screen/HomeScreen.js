import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { GetTopRatedMovies, GetTrendingMovies, GetUpComingMovies } from '../API/moviedb';
import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrendingMovies from '../components/trendingMovies';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import MovieList from '../components/moviesList';
import { StatusBar } from 'expo-status-bar';
import Loading from '../components/loading';
import { style } from '../theme';

const ios = Platform.OS == 'ios';
export default function HomeScreen() {
    const [trending, setTrending] = useState([]);
    const [upComing, setUpComing] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getTrendingMovies();
        getUpComingMovies();
        getTopRatedMovies();
    },[])

    const getTrendingMovies = async ()=> {
        const data = await GetTrendingMovies();
        if(data && data.results) setTrending(data.results);
        setLoading(false);
    }
    const getUpComingMovies = async ()=> {
        const data = await GetUpComingMovies();
        if(data && data.results) setUpComing(data.results);
    }
    const getTopRatedMovies = async ()=> {
        const data = await GetTopRatedMovies();
        if(data && data.results) setTopRated(data.results);
    }

    return (
        <View className="flex-1 bg-neutral-800">
            {/* search bar and logo */}
            <SafeAreaView className={ios? "-mb-2": 'mb-3'}>
                <StatusBar style='light'/>
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    <Text className="text-white text-3xl font-bold">
                        <Text style={style.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                loading? (
                    <Loading/>
                ) : (
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    centerContainerStyle={{paddingBottom: 10}}
                >
                    {/* trending movies carousel */}
                    {
                        trending.length > 0 && <TrendingMovies data={trending}/>
                    }
                    
    
                    {/* upcoming Movies */}
                    <MovieList title="Upcoming" data={upComing} />
    
                    {/* top rated movies row */}
                    <MovieList title="Top Rated" data={topRated} />
    
                </ScrollView>
                )
            }
        </View>
    )
}