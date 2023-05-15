import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      // headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY);
      headers.set('X-RapidAPI-Key', 'b5f30baacbmsh8cbfb028676298ep1ced9bjsn2e725623ea00');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'v1/charts/world' }),
    getSongsByGenre: builder.query({ query: (genre) => `v1/charts/genre-world?genre_code=${genre}` }),
    getSongsByCountry: builder.query({ query: (countryCode) => `v1/charts/country?country_code=${countryCode}` }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
    getArtistDetails: builder.query({ query: (artistId) => `v2/artists/details?artist_id=${artistId}` }),
    getSongDetails: builder.query({ query: ({ songid }) => `v1/tracks/details?track_id=${songid}` }),
    getSongRelated: builder.query({ query: ({ songid }) => `v1/tracks/related?track_id=${songid}` }),
  }),
});

// endpoints: (builder) => ({
//     getTopCharts: builder.query({ query: () => 'v1/charts/world' }),
//     getSongsByGenre: builder.query({ query: (genre_code) => `v1/charts/genre-world?genre_code=POP` }),
//     getSongsByCountry: builder.query({ query: (country_code) => `v1/charts/country?country_code=DZ` }),
//     getSongsBySearch: builder.query({ query: (search_type) => `v1/search/multi?search_type=SONGS_ARTISTS&query=metallica` }),
//     getArtistDetails: builder.query({ query: (artist_id) => `v2/artists/details?artist_id=136975}` }),
//     getSongDetails: builder.query({ query: ({ track_id }) => `v1/tracks/details?track_id=554591360` }),
//     getSongRelated: builder.query({ query: ({ track_id }) => `v1/tracks/related?track_id=554591360` }),
//   }),
// });

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;
