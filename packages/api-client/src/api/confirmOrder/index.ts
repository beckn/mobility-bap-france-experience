import { Config } from './../../types/Setup';
import * as sa from 'superagent';
import { AckResponse } from '../../types/BecknClientApi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function confirmOrder(
  context,
  params
): Promise<AckResponse> {
  const config = context.config as Config;
  const client = context.client as sa.SuperAgent<sa.SuperAgentRequest>;

  return client
    .post(
      'https://api-node.mobilityreferencebap.becknprotocol.io/client/v1/confirm'
    )
    .send(params)
    .then((res) => {
      return res.body as AckResponse;
    });
}
