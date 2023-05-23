import { readFileSync } from 'node:fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { OfferAccommodation } from '../../types/offer-accommodation.enum.js';
import { OfferCity } from '../../types/offer-city.enum.js';
import { OfferGoods } from '../../types/offer-goods.enum.js';
import { UserType } from '../../types/user-type.enum.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(
        ([
          title,
          description,
          data,
          city,
          previewImage,
          images,
          isPremium,
          rating,
          accommodationType,
          roomsCount,
          adultsCount,
          price,
          goods,
          name,
          email,
          avatarPath,
          password,
          type,
          commentsCount,
          latitude,
          longitude,
        ]) => ({
          title,
          description,
          data,
          city: city as OfferCity,
          previewImage,
          images: images.split(';').map((item) => item),
          isPremium: Boolean(isPremium),
          rating: Number(rating),
          accommodationType: accommodationType as OfferAccommodation,
          roomsCount: Number(roomsCount),
          adultsCount: Number(adultsCount),
          price: Number(price),
          goods: goods.split(';') as OfferGoods[],
          author: {
            name,
            email,
            avatarPath,
            password,
            type: type as UserType,
          },
          commentsCount: Number(commentsCount),
          location: {
            latitude: Number(latitude),
            longitude: Number(longitude)
          },
        })
      );
  }
}
