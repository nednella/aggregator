async function parseSettledFetchResponse<T>(response: PromiseSettledResult<Response>): Promise<T> {
    // handle rejected fetch -- network error, etc.
    if (response.status === "rejected") {
        throw new Error("not fulfilled");
    }

    // handle non-2xx
    const res = response.value;
    if (!res.ok) {
        throw new Error("not OK");
    }

    return (await res.json()) as T;
}

export { parseSettledFetchResponse };
