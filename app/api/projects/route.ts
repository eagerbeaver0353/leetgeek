import { NextRequest } from 'next/server'
import siteMetadata from '@/data/siteMetadata'
import { getProjectsByQuery, getProjectsByIds } from '@/utils/mongodb'

interface RequestParams {
  type: 'query' | 'id'
  data: string[] | string
  pageSize?: number
  pageNumber?: number
}

const handler = async function (request: NextRequest) {
  const body: RequestParams = await request.json()
  const { type, data, pageNumber, pageSize } = body

  const result =
    type == 'query'
      ? await getProjectsByQuery(data, pageNumber, pageSize)
      : await getProjectsByIds(data, pageNumber, pageSize)

  return Response.json(result)
}

export { handler as GET, handler as POST }
