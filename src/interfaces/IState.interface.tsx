import IEpisode from './IEpisode.interface';

export default interface IState {
    episodes: Array<IEpisode>,
    favourites: Array<IEpisode>
}