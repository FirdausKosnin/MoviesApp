import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import Loading from '../components/loading';
import { debounce } from 'lodash'; 
import { GetSearchMoviesAPI, fallbackMoviePoster, image185, image342 } from '../API/moviedb';

const {width, height} = Dimensions.get('window');
export default function SearchScreen() {
    const [loading, setLoading] = useState(false);
    const [result, setResults] = useState([]);
    const navigation = useNavigation();
    let movieName = "Jones Weak"

    
    const handleSearch = value => {
        if(value && value.length >2){
            setLoading(true);
            GetSearchMoviesAPI({
                query: value, 
                include_adult: false,
                language: 'en-US',
                page: 1}
            ).then(data=>{
                setLoading(false);
                if (data && data.results) setResults(data.results);
            })
        }else{
            setLoading(false);
            setResults([]);
        }
        console.log(value);
    }

    const handleTextDebounce = useCallback(debounce(handleSearch,400), [])

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
        <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
            <TextInput onChangeText={handleTextDebounce} placeholder='Search Movie' placeholderTextColor={'lightgrey'} className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"/>
            <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-full p-3 m-1 bg-neutral-500">
                <XMarkIcon size={25} color='white'/>
            </TouchableOpacity>
        </View>

        {
            loading? (
                <Loading/>
            ) : 
                result.length > 0? (
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 15}}
                    className="space-y-3 mt-3">
        
                    <Text className="text-white font-semibold ml-1">
                        Result ({result.length})
                    </Text>
                    <View className="flex-row justify-between flex-wrap">
                        {
                            result.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback key={index} onPress={() => navigation.push("Movie", item)}>
                                        <View className="space-y-2 mb-4">
                                            <Image className="rounded-3xl" source={{uri: image185(item?.poster_path) || fallbackMoviePoster}} style={{width: width*0.45, height: height*0.3}}/>
                                            <Text className="text-center text-neutral-300">
                                                {item?.title.length > 14? item?.title.slice(0, 14) + "..." : item?.title}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </View>
                </ScrollView>
                 ): (
                    <View className="flex-row justify-center">
                        <Image source={require('../assets/images/Searching.png')} className="h-96 w-96"/>
                    </View>
                )
        }
        {/* Search Result */}

    </SafeAreaView>
  )
}