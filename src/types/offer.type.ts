import { User } from './user.type.js';
import { OfferAccommodation } from './offer-accommodation.enum.js';
import { OfferCity } from './offer-city.enum.js';
import { OfferGoods } from './offer-goods.enum.js';
import { Location } from './location.type.js';

export type Offer = {
  title: string;
  description: string;
  data: string;
  city: OfferCity;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  rating: number;
  accommodationType: OfferAccommodation;
  roomsCount: number;
  adultsCount: number;
  price: number;
  goods: OfferGoods[];
  author: User;
  commentsCount: number;
  location: Location;
}
