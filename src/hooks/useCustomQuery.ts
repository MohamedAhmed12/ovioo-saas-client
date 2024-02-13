import { DocumentNode, QueryResult, useQuery } from "@apollo/client";

export const useCustomQuery = (
    query: DocumentNode,
    queryData: any,
    fetchPolicy?: string,
    nextFetchPolicy?: string
): QueryResult<any> => {
    let options: any = {
        variables: {
            data: queryData,
        },
    };
    options = fetchPolicy ? { ...options, fetchPolicy } : options;
    options = nextFetchPolicy ? { ...options, nextFetchPolicy } : options;

    return useQuery(query, options);
};
