import { MetaError } from '@/libs/common/errors'
import { GraphQLClient } from 'graphql-request'
import fetch from 'cross-fetch'


const endpoint = `https://ec2-34-224-67-13.compute-1.amazonaws.com/graphql`

export const graphqlClient = new GraphQLClient(endpoint, {
  fetch,
  credentials: 'include',
})

export function fetcher<TData, TVariables extends object>(
  query: string,
  variables?: TVariables,
  requestHeaders?: HeadersInit
) {
  return async (): Promise<TData> =>
    graphqlClient
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
      .request<TData, TVariables>(query, variables, requestHeaders)
      .catch(({ response }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (Boolean((process as any).browser) && response?.status === 401) {
          return {} as TData
        } else {
          throw new MetaError(response?.error, response?.status, { response })
        }
      })
}



