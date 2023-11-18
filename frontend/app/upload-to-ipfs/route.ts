import { create } from 'ipfs-http-client';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextApiRequest) => {
  const client = create();
  const json = request.body?.data;
  console.log({
    json,
    body: request.body,
  });
  const ipfsPath = await client.add(JSON.stringify(json));
  console.log({
    ipfsPath,
  });
  return NextResponse.json(
    {
      hash: ipfsPath.path,
    },
    {
      status: 200,
    }
  );
};
