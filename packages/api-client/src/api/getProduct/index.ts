import { CustomQuery, Logger } from '@vue-storefront/core';
import { Config } from './../../types/Setup';
import * as sa from 'superagent';
// import { SearchItemsWhere } from '../../types/Search';
import { AckResponse } from '../../types/BecknClientApi';
import { Context } from '@vue-storefront/core';
import { v4 as uuidv4 } from 'uuid';

/* eslint  camelcase: 0 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getProduct(
  context: Context,
  params,
  customQuery?: CustomQuery
): Promise<AckResponse> {
  const criteriaData: { [k: string]: any } = {};
  if (params.pickup_location)
    criteriaData.pickupLocation = params.pickup_location;
  if (params.drop_location) criteriaData.dropLocation = params.drop_location;
  if (params.created_at) criteriaData.created_at = params.created_at;

  const qParams = {
    context: {
      // transaction_id: uuidv4()
      domain: 'mobility'
    },
    message: {
      criteria: criteriaData
    }
  };
  const config = context.config as Config;
  const client = context.client as sa.SuperAgent<sa.SuperAgentRequest>;
  Logger.error(qParams);
  return client
    .post(
      'https://api-node.mobilityreferencebap.becknprotocol.io//client/v2/search'
    )
    .send(qParams)
    .then((res) => {
      return res.body as AckResponse;
    })
    .catch((err) => {
      console.log(err);

      throw new Error('Error in Api');
    });

  /* return Promise.resolve({
    data: [],
    total: 0
  });*/
}
