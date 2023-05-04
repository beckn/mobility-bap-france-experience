export enum SearchType {
  // item, brand, offer, vendor, category
  ITEM = 'item',
  BRAND = 'brand',
  OFFER = 'offer',
  VENDOR = 'vendor',
  CATEGORY = 'category',
}

export class SearchRequest {
  constructor(
    public drop_location: string,
    public pickup_location: string,
    public experienceId: string,
    public created_at: number
  ) {}

  toParams() {
    return Object.assign(
      {},
      this.drop_location && { drop_location: this.drop_location },
      this.pickup_location && { pickup_location: this.pickup_location },
      this.experienceId && { experienceId: this.experienceId },
      this.created_at && { created_at: this.created_at }
    );
  }
}

export interface BaseSearchWhere {
  drop_location?: string;
}

export interface SearchItemsWhere extends BaseSearchWhere {
  pickup_location: string;
  experienceId: string;
  created_at: number;
}
export interface PollRequest {
  // eslint-disable-next-line camelcase
  message_id: string;
  limit?: number;
  skip?: number;
}
export class OnSearchRequest {
  constructor(
    // eslint-disable-next-line camelcase
    public messageId: string,
    public limit?: number,
    public skip?: number
  ) {}

  toParams() {
    return Object.assign(
      {},
      // eslint-disable-next-line camelcase
      this.messageId && { messageId: this.messageId },
      this.limit && { limit: this.limit },
      this.skip && { skip: this.skip }
    );
  }
}
