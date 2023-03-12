import { DataBase, StatusCodeMessageSpec } from 'src/utils/models/models';

export enum StatusCodeText {
  USER_ID_INVALID = 'User ID is invalid (not uuid).',
  TRACK_ID_INVALID = 'Track ID is invalid (not uuid).',
  ARTIST_ID_INVALID = 'Artist ID is invalid (not uuid).',
  ALBUM_ID_INVALID = 'ALbum ID is invalid (not uuid).',
  RECORD_DOESNOT_EXIST = `Record with such ID does't exist.`,
  NO_REQUIRED_FIELDS = 'Not all the required fields are filled.',
  WRONG_OLD_PASSWORD = 'Old password is wrong.',
  NOT_FAVORITE_TRACK = 'Track is not favorite',
  NOT_FAVORITE_ALBUM = 'Album is not favorite',
  NOT_FAVORITE_ARTIST = 'Artist is not favorite',
  NO_TRACK_TO_ADD = 'No such track to add',
  NO_ALBUM_TO_ADD = 'No such album to add',
  NO_ARTIST_TO_ADD = 'No such artist to add',
  NO_VALID_LOGIN_OR_PASSWORD = `Not valid login or password. Both should have a type of 'string'`,
  NO_VALID_PASS_OR_OLD_PASS = `Not valid password or previos password. Both should have a type of 'string'`,
}

export enum StatusCodeMessage {
  wrongUserId,
  wrongTrackId,
  wrongArtistId,
  wrongAlbumId,
  noSuchRecord,
  noRequiredFields,
  wrongOldPassword,
  notFavoriteTrack,
  notFavoriteAlbum,
  notFavoriteArtist,
  noTrackToAdd,
  noAlbumToAdd,
  noArtistToAdd,
  noValidLoginOrPassword,
  noValidPasswordOrOldPassword,
}

export const showMessageWithStatus = (
  status: StatusCodeMessage,
): StatusCodeMessageSpec => {
  switch (status) {
    case StatusCodeMessage.wrongUserId:
      return { statusCode: 400, message: StatusCodeText.USER_ID_INVALID };
    case StatusCodeMessage.wrongTrackId:
      return { statusCode: 400, message: StatusCodeText.TRACK_ID_INVALID };
    case StatusCodeMessage.wrongAlbumId:
      return { statusCode: 400, message: StatusCodeText.ALBUM_ID_INVALID };
    case StatusCodeMessage.wrongArtistId:
      return { statusCode: 400, message: StatusCodeText.ARTIST_ID_INVALID };
    case StatusCodeMessage.noSuchRecord:
      return { statusCode: 404, message: StatusCodeText.RECORD_DOESNOT_EXIST };
    case StatusCodeMessage.wrongOldPassword:
      return { statusCode: 403, message: StatusCodeText.WRONG_OLD_PASSWORD };
    case StatusCodeMessage.noRequiredFields:
      return { statusCode: 400, message: StatusCodeText.NO_REQUIRED_FIELDS };
    case StatusCodeMessage.notFavoriteAlbum:
      return { statusCode: 404, message: StatusCodeText.NOT_FAVORITE_ALBUM };
    case StatusCodeMessage.notFavoriteArtist:
      return { statusCode: 404, message: StatusCodeText.NOT_FAVORITE_ARTIST };
    case StatusCodeMessage.notFavoriteTrack:
      return { statusCode: 404, message: StatusCodeText.NOT_FAVORITE_TRACK };
    case StatusCodeMessage.noAlbumToAdd:
      return { statusCode: 422, message: StatusCodeText.NO_ALBUM_TO_ADD };
    case StatusCodeMessage.noArtistToAdd:
      return { statusCode: 422, message: StatusCodeText.NO_ARTIST_TO_ADD };
    case StatusCodeMessage.noTrackToAdd:
      return { statusCode: 422, message: StatusCodeText.NO_TRACK_TO_ADD };
    case StatusCodeMessage.noValidLoginOrPassword:
      return {
        statusCode: 400,
        message: StatusCodeText.NO_VALID_LOGIN_OR_PASSWORD,
      };
    case StatusCodeMessage.noValidPasswordOrOldPassword:
      return {
        statusCode: 400,
        message: StatusCodeText.NO_VALID_PASS_OR_OLD_PASS,
      };
  }
};

export const dataBase: DataBase = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorites: {
    artists: [],
    tracks: [],
    albums: [],
  },
};
