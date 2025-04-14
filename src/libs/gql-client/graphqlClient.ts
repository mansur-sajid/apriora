import { MetaError } from '@/libs/common/errors'
import { GraphQLClient } from 'graphql-request'
import fetch from 'cross-fetch'


const endpoint = `https://6242-51-36-232-117.ngrok-free.app/graphql`

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
      .request<TData, TVariables>(query, variables, requestHeaders)
      .catch(({ response }) => {
        if (Boolean((process as any).browser) && response?.status === 401) {
          return {} as TData
        } else {
          throw new MetaError(response?.error, response?.status, { response })
        }
      })
}



