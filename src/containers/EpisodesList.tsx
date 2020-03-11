import React from 'react'
import IEpisode from './../interfaces/IEpisode.interface';

export default function EpisodesList(props: any): Array<JSX.Element> {
    const {episodes, addToFav, removeFromFav, favourites} = props;

    return (episodes.length !== 0? episodes.map(
        (episode: IEpisode) => {
          return(
            <section key={episode.id} className="episode-box">
              <img src={episode.image.medium} alt={`Rick and Morty ${episode.name}`}/>
              <div>{episode.name}</div>
              <section style={{ display: "flex", justifyContent: "space-between"}}>
                <div>Season: {episode.season} Number: {episode.number}</div>
                {
                  favourites.find((fav: IEpisode) => fav.id === episode.id)
                  ?<button type="button" className="remove-button" onClick={() => removeFromFav(episode)}>Remove favourite</button>
                  :<button type="button" className="add-button" onClick={() => addToFav(episode)}>Add favourite</button>
                }
              </section>
            </section>
          )
        }
      ):null)
}
