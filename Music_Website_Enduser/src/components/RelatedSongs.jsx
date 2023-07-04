import SongBar from "./SongBar";

const RelatedSongs = ({data, isPlaying, activeSong, artistId, handlePauseClick, handlePlayClick}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Các bài hát liên quan</h1>
    <div className="mt-6 w-full flex flex-col">
      {data?.tracks.map((song, i) => (
        <SongBar
          key={`${artistId}-${song.key}-${i}`}
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
        ))}
    </div>
  </div>
);

export default RelatedSongs;
