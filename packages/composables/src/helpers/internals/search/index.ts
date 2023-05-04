// import { AgnosticFacetSearchParams } from '@vue-storefront/core';
// import { SearchItemsWhere } from '@vue-storefront/beckn-api';

export const buildSearchItemsWhere = (params) => {
  const paramsObj: { [k: string]: any } = {
    pickup_location: params.pickup_location,
    drop_location: params.drop_location,
    experienceId: params.experienceId,
    created_at: params.created_at
  };
  return paramsObj;
};
