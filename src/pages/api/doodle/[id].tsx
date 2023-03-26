import type { NextApiRequest, NextApiResponse } from 'next'
import fetchGetWithRetry from '@/utils/fetchGetWithRetry'
import { DoodleMetadata, DOODLE_METADATA_URL } from '@/constants'

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<DoodleMetadata | { error: string }>,
) {
  const { query } = req
  const tokenId = (query.id as string) || ''

  if (tokenId === '') {
    res.json({ error: 'No tokenId found' })
    return
  }
  if (Number(tokenId) > 10000 || Number(tokenId) < 0 || isNaN(Number(tokenId))) {
    res.json({ error: 'Not a valid tokenId' })
    return
  }
  const doodleResponse = (await fetchGetWithRetry(`${DOODLE_METADATA_URL}/${tokenId}`)) as DoodleMetadata

  res.status(200).json({
    ...doodleResponse,
  })
}
