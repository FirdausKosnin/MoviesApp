import { GetMoviesCedits, GetMoviesDetails, GetMoviesSimilars, fallbackMoviePoster, image500 } from '../API/moviedb';
import { View, ScrollView, TouchableOpacity, Dimensions, Platform, Image, Text } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import MovieList from '../components/moviesList';
import { style, theme } from '../theme';
import Cast from '../components/cast';
import Loading from '../components/loading';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const TopMargin = ios? '': 'mt-3';

export default function MovieScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation();

    const [cast, setCast] = useState([]);
    const [movie, setMovie] = useState({});
    const [similarMovies, setSimilarMovies] = useState([])
    const [isFavourite, toggleFavourite] = useState(false);
    
    const [loading, setLoading] = useState(true);
    let movieName = 'Jones Weak';
    useEffect(() => {
        getMoviesDetails(item.id);
        getMoviesCedits(item.id);
        getMoviesSimilars(item.id);
    }, [item]);

    const getMoviesDetails = async id=>{
        const data = await GetMoviesDetails(id);
        if(data) setMovie(data);
        setLoading(false);
    }

    const getMoviesCedits = async id=>{
        const data = await GetMoviesCedits(id);
        if(data && data.cast) setCast(data.cast);
    }

    const getMoviesSimilars = async id=>{
        const data = await GetMoviesSimilars(id);
        if(data && data.results) setSimilarMovies(data.results);
    }

    return (
        <ScrollView className="flex bg-neutral-900" contentContainerStyle={{paddingBottom: 20}}>
            {/* Top Icon */}
            <View className="w-full">
                <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4">
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.background} className="rounded-xl p-1">
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                         <HeartIcon size={35} color={ isFavourite? theme.background :"white"}/>
                     </TouchableOpacity>
                </SafeAreaView>

                {/* Movie Poster */}
                {
                    loading? (
                        <Loading/>
                    ) : (
                    <View>
                        <Image source={{uri: image500(movie?.poster_path) || fallbackMoviePoster}} style={{height: height*0.5, width: width}}/>
                        <LinearGradient colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']} style={{width, height: height*0.4}} 
                            start={{x: 0.5, y:0}}
                            end={{x: 0.5, y:1}}
                            className="absolute bottom-0"/>
                    </View>
                    )
                }
            </View>

            {/* Movie Details */}
            <View style={{marginTop: -(height*0.10)}} className="space-y-3">
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {movie?.title}
                </Text>

                {/* Status, relese, runtime */}
                {
                    movie?.id? (
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                            {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
                        </Text>
                    ) : null
                }

                {
                    movie?.id? (
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                            {
                                movie?.genres?.map((genre, index) => {
                                    let showDot = index+1 != movie.genres.length;
                                    return (
                                            <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                                {genre?.name} {showDot? "•": null}
                                            </Text>
                                        )
                                })
                            }
                        </Text>
                    ) : null
                }
                {/* Genre */}


                <Text className="text-neutral-400 mx-4 text-base tracking-wider text-center">
                    {
                        movie?.overview
                    }
                </Text>
            </View>

            {/* Actor */}
            <Cast navigation={navigation} cast={cast}/>

            {/* Similar Movie */}
            <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies}/>
        </ScrollView>
    );
}