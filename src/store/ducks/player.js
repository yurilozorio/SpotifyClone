import Sound from 'react-sound';

export const Types = {
  LOAD: 'player/LOAD',
  PLAY: 'player/PLAY',
  PAUSE: 'player/PAUSE',
  NEXT: 'player/NEXT',
  PREV: 'player/PREV',
  PLAYING: 'player/PLAYING',
  HANDLE_CURRENT: 'player/HANDLE_CURRENT',
  SET_CURRENT: 'player/SET_CURRENT',
  SET_VOLUME: 'player/SET_VOLUME',
};

const INITIAL_STATE = {
  currentSong: null,
  list: [],
  status: Sound.status.PLAYING,
  current: null,
  currentShown: null,
  duration: null,
  volume: 100,
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOAD: {
      return {
        ...state,
        currentSong: action.payload.song,
        list: action.payload.list,
        status: Sound.status.PLAYING,
        current: 0,
        duration: 0,
      };
    }
    case Types.PLAY:
      return { ...state, status: Sound.status.PLAYING };
    case Types.PAUSE:
      return { ...state, status: Sound.status.PAUSED };
    case Types.NEXT: {
      const currentIndex = state.list.findIndex(song => song.id === state.currentSong.id);
      const next = state.list[currentIndex + 1];

      if (next) {
        return {
          ...state,
          currentSong: next,
          current: 0,
          duration: 0,
          status: Sound.status.PLAYING,
        };
      }

      return state;
    }
    case Types.PREV: {
      const currentIndex = state.list.findIndex(song => song.id === state.currentSong.id);
      const prev = state.list[currentIndex - 1];

      if (prev) {
        return {
          ...state,
          currentSong: prev,
          current: 0,
          duration: 0,
          status: Sound.status.PLAYING,
        };
      }

      return state;
    }
    case Types.PLAYING:
      return {
        ...state,
        current: action.payload.position,
        duration: action.payload.duration,
      };
    case Types.HANDLE_CURRENT:
      return { ...state, currentShown: state.duration * action.payload.percent };
    case Types.SET_CURRENT:
      return { ...state, current: state.duration * action.payload.percent, currentShown: null };
    case Types.SET_VOLUME:
      return { ...state, volume: action.payload.volume };
    default:
      return state;
  }
}

export const Creators = {
  loadSong: (song, list) => ({
    type: Types.LOAD,
    payload: { song, list },
  }),

  play: () => ({ type: Types.PLAY }),

  pause: () => ({ type: Types.PAUSE }),

  next: () => ({ type: Types.NEXT }),

  prev: () => ({ type: Types.PREV }),

  playing: ({ position, duration }) => ({
    type: Types.PLAYING,
    payload: { position, duration },
  }),

  handleCurrent: percent => ({
    type: Types.HANDLE_CURRENT,
    payload: { percent },
  }),

  setCurrent: percent => ({
    type: Types.SET_CURRENT,
    payload: { percent },
  }),

  setVolume: volume => ({
    type: Types.SET_VOLUME,
    payload: { volume },
  }),
};
