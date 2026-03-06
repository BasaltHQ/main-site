// Supabase stub — all data access has been migrated to MongoDB.
// This file exists only to prevent build errors from legacy imports.
// Components should be progressively migrated to use server actions or API routes.

export function createClient() {
    const noopQuery = () => ({
        select: () => noopQuery(),
        eq: () => noopQuery(),
        order: () => noopQuery(),
        insert: () => noopQuery(),
        update: () => noopQuery(),
        delete: () => noopQuery(),
        single: () => noopQuery(),
        limit: () => noopQuery(),
        gte: () => noopQuery(),
        lte: () => noopQuery(),
        in: () => noopQuery(),
        is: () => noopQuery(),
        or: () => noopQuery(),
        not: () => noopQuery(),
        match: () => noopQuery(),
        then: (resolve: any) => resolve({ data: [], error: null }),
        data: [],
        error: null,
    })

    return {
        from: () => noopQuery(),
        storage: {
            from: () => ({
                upload: async () => ({ data: null, error: null }),
                getPublicUrl: () => ({ data: { publicUrl: '' } }),
                list: async () => ({ data: [], error: null }),
                remove: async () => ({ data: null, error: null }),
            })
        },
        auth: {
            getSession: async () => ({ data: { session: null }, error: null }),
            getUser: async () => ({ data: { user: null }, error: null }),
        },
        rpc: async () => ({ data: null, error: null }),
    }
}
