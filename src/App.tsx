import React,{ Fragment, useContext, useEffect} from 'react'
import { Store } from './Store';
import IEpisode from './interfaces/IEpisode.interface';
import IAction from './interfaces/IAction.interface';

const EpisodesList = React.lazy<any>(() => import('./containers/EpisodesList'));

export default function App():JSX.Element {
  const {state, dispatch} = useContext(Store);
  
  useEffect(
    () => {
      fecthData()
    }, []
  )

  const fecthData = async() => {
    const URL = "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";
    const data = await fetch(URL);
    const dataJson = await data.json();
    return dispatch({
      type: "FETCH_DATA",
      payload: dataJson._embedded.episodes
    })
  }

  const addToFav = (episode: IEpisode): IAction => {
    return dispatch({
      type: "ADD_FAVOURITE",
      payload: episode
    })
  }

  const removeFromFav = (episode: IEpisode): IAction => {
    const newFavourites = state.favourites.filter((fav: IEpisode) => fav.id !== episode.id);
    return dispatch({
      type: "REMOVE_FAVOURITE",
      payload: newFavourites
    })
  }

  const props = {
    episodes: state.episodes,
    addToFav,
    removeFromFav,
    favourites: state.favourites
  }

  
  return (
    <Fragment>
      <header className="header">
        <h1>Rick and  Morty</h1>
        <section>
          <p style={{fontSize: 15}}>Pick your favourite episode !!</p>
          <p style={{fontSize: 16}}>{`♥ ${state.favourites.length}`}</p>
        </section>
      </header>

      <section className="episode-layout">
        <React.Suspense fallback={ <div>Loading...</div> }>
          <EpisodesList {...props} />
        </React.Suspense>
      </section>
    </Fragment>
  )
}
