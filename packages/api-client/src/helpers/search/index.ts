import {
  SearchRequest,
  SearchType,
  SearchItemsWhere,
  OnSearchRequest,
  PollRequest,
} from './../../types/Search';

export const buildSearchRequest = (
  search?: SearchItemsWhere
): SearchRequest => {
  if (search) {
    return new SearchRequest(
      search.drop_location,
      search.pickup_location,
      search.experienceId,
      search.created_at
    );
  }
};

export const buildOnSearchRequest = (pollRequest?: PollRequest) => {
  if (pollRequest) {
    return new OnSearchRequest(
      pollRequest.message_id,
      pollRequest.limit,
      pollRequest.skip
    ).toParams();
  }
};
