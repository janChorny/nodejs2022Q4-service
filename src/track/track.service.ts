import { dataBase } from 'src/constants/constants';
import { v4 } from 'uuid';
import { CreateTrackDTO } from './dto/trackCreate.dto';
import { UpdateTrackDTO } from './dto/trackUpdate.dto';

export class TrackService {
  getAllTracks() {
    return dataBase.tracks;
  }

  getTrack(id: string) {
    const track = dataBase.tracks.find((track) => track.id === id);
    return track;
  }

  createTrack({ name, duration, artistId, albumId }: CreateTrackDTO) {
    const track = {
      id: v4(),
      name,
      duration,
      artistId,
      albumId,
    };

    dataBase.tracks.push(track);
    return track;
  }

  updateTrack(id: string, updateTrackDTO: UpdateTrackDTO) {
    const trackToUpdateIndex = dataBase.tracks.findIndex(
      (track) => track.id === id,
    );
    const trackToUpdate = dataBase.tracks[trackToUpdateIndex];
    dataBase.tracks[trackToUpdateIndex] = {
      ...trackToUpdate,
      ...updateTrackDTO,
    };
    return dataBase.tracks[trackToUpdateIndex];
  }

  deleteTrack(id: string) {
    dataBase.tracks = dataBase.tracks.filter((track) => track.id !== id);
    return;
  }

  getTrackByArtist(id: string) {
    return dataBase.tracks.find((track) => track.artistId === id);
  }

  getTrackByAlbum(id: string) {
    return dataBase.tracks.find((track) => track.albumId === id);
  }
}
