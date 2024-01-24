import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import requests from '../Requests';
import {AiOutlinePlayCircle, AiOutlineInfoCircle, AiOutlineClose } from 'react-icons/ai';

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const youtubeApiKey = 'AIzaSyAVf6wY5dE8LgvCUOvEh-KW0LhjQnqKvOE'; 

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const fetchTrailerKey = async (movieId) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: 'snippet',
            type: 'video',
            q: `${movie?.title} official trailer`,
            key: youtubeApiKey,
          },
        }
      );
      const videoId = response.data.items[0]?.id?.videoId;
      setTrailerKey(videoId);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error fetching YouTube trailer:', error);
    }
  };

  const handlePlayClick = () => {
    if (movie?.id) {
      fetchTrailerKey(movie.id);
      setIsVideoOpen(true);
    }
  };

  const handleCloseClick = () => {
    setIsVideoOpen(false);
    setIsPlaying(false);
    setTrailerKey(null);
    setVideoStarted(false);
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  return (
    <div className='w-full h-[600px] text-white'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[600px] bg-gradient-to-r from-black'></div>
        <img
          className='w-full h-full object-fit'
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />

        <div className='absolute w-full top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
          <div className='my-4'>
            <button
              className='border bg-gray-300 text-black border-gray-300 py-2 px-5 '
              onClick={handlePlayClick}
            >
            <AiOutlinePlayCircle className='ml-1' />Play 
            </button>
            <button className='border text-white border-gray-300 py-2 px-5 ml-4'>
           
            <AiOutlineInfoCircle className='ml-5' />More info
            </button>
          </div>
          <p className='text-gray-400 text-sm'>
            Released: {movie?.release_date}
          </p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>


      {isPlaying && (
  <div className='fixed top-0 left-0 w-full h-full bg-black z-50'>
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      {trailerKey && (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          width='90vw'  // Set a maximum width, adjust as needed
          height='50vh'  // Set a fixed or percentage height, adjust as needed
          controls
          playing={videoStarted}
          onPlay={() => setVideoStarted(true)}
          onEnded={handleCloseClick}
        />
      )}
      {isVideoOpen && (
        <div className='absolute top-0 right-0 transform -translate-y-1/2'>
          <button
            className='text-white text-2xl bg-gray-800 px-4 py-2 rounded-full'
            onClick={handleCloseClick}
          >
            <AiOutlineClose />
          </button>
        </div>
      )}
    </div>
  </div>
)}
    </div>
  );
};

export default Main;
