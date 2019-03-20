
export function getPageableIncoming(page, limit) {
    return fetch(`/api/incoming?page=${page}&limit=${limit}`)
        .then(res => res.json());
}
