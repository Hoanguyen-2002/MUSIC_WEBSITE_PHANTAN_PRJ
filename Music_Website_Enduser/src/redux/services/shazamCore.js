// KJ​wZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA

// KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const shazamCoreApi = createApi({
    reducerPath:'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://shazam.p.rapidapi.com',
        prepareHeaders:(headers)=>{
            headers.set('X-RapidAPI-Key','4626515812msh78581e607d113f7p1767b0jsncd66f0cf4733')
            return headers;
        },
    }),
    endpoints:(builder)=>({
        getTopCharts: builder.query({query:()=>'/charts/track'}),
        getSongDetails: builder.query({query:({songid})=>`/songs/get-details?key=${songid}`}),
        getSongRelated: builder.query({query:({songid})=>`/songs/list-recommendations?key=484129036`}),
        getArtistDetails: builder.query({query:(artistId)=>`/artists/get-details?id=${artistId}`}),
        getArtistRelated: builder.query({query:(artistId)=>`/artists/get-top-songs?id=${artistId}`}),
        getSongsByCountry: builder.query({query:(countryid)=>`/charts/list?id=${countryid}`}),
        getSongsBySearch: builder.query({query:(searchTerm)=>`/search?term=${searchTerm}`}),
    }),
});

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetArtistRelatedQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery,
} = shazamCoreApi;