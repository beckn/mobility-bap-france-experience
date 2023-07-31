import * as sa from 'superagent';
import { AckResponse } from '../../types/BecknClientApi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function confirmOrder(
  context,
  params
): Promise<AckResponse> {
  const client = context.client as sa.SuperAgent<sa.SuperAgentRequest>;

  return client
    .post(
      'https://api-node.mobilityreferencebap.becknprotocol.io//client/v2/confirm'
    )
    .send(params)
    .then((res) => {
      return res.body as AckResponse;
    });
}
