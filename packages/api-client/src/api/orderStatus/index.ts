import { Config } from '../../types/Setup';
import * as sa from 'superagent';
import { onInitializeOrderParam } from '../../types/initializeOrder';
import { AckResponse } from '../../types/BecknClientApi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function orderStatus(
  context,
  params: onInitializeOrderParam
): Promise<AckResponse> {
  const client = context.client as sa.SuperAgent<sa.SuperAgentRequest>;
  return client
    .post(
      'https://api-node.mobilityreferencebap.becknprotocol.io//client/v2/status'
    )
    .send(params)
    .then((res) => {
      return res.body as AckResponse;
    });
}

export async function onOrderStatus(
  context,
  params: onInitializeOrderParam
): Promise<AckResponse> {
  const config = context.config as Config;
  const client = context.client as sa.SuperAgent<sa.SuperAgentRequest>;
  return client
    .get(config.api.url + config.api.endpoints.onOrderStatus)
    .query(params)
    .then((res) => {
      return res.body as AckResponse;
    });
}
