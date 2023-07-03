import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";
//import { useGetArtistRelatedQuery } from "../redux/services/shazamCore";
import { useGetSongRelatedQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
    const dispatch = useDispatch();
    const {songid, id:artistId} = useParams();
    const {activeSong, isPlaying} = useSelector((state)=>state.player);
    const {data: artistData, isFetching: isfetchingArtistDetails, error:errorAD} = useGetArtistDetailsQuery(artistId);
    //const {data: artistRelated, isfetching:isFetchingArtistRelated, error} =useGetArtistRelatedQuery(artistId);
    const {data: songData, isFetching: isfetchingSongDetails} = useGetSongDetailsQuery({songid});
    const {data, isFetching:isFetchingRelatedSongs, error} = useGetSongRelatedQuery({songid});
    console.log(artistData?.data[0])
    console.log(songData);
    console.log(songid);
    console.log(data);
  

    if(isfetchingArtistDetails || isFetchingRelatedSongs || isfetchingSongDetails) return <Loader title={'Loading artist details'}/>
    if(errorAD && error) return <Error/>

    const handlePauseClick = () => {
      dispatch(playPause(false));
    };
  
    const handlePlayClick = (song, i) => {
      const data = ArtistRelated?.songs;
      dispatch(setActiveSong({ song, data, i }));
      dispatch(playPause(true));
    };
  
    
    return (
        <div className="flex flex-col ">
            <DetailsHeader
                artistId={artistId}
                artistData={artistData?.data[0]}
            />

            <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                artistId={artistId}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />

        </div>
    )
    

};

export default ArtistDetails;