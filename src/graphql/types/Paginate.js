import { gql } from 'apollo-server-express';

export const PaginateTemplate = `
    totalDocs: Int
    limit: Int
    totalPages: Int
    page: Int
    hasPrevPage: Boolean
    hasNextPage: Boolean
    prevPage: Int
    nextPage: Int
`;

export const PaginateDefs = gql`
    type Paginate {
        ${PaginateTemplate}
    }

    input PaginateInput {
        limit: Int
        page: Int
    }
`;
