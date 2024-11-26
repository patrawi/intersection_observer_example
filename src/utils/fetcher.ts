import { PaginatedResponse } from "../types/types";

export async function fetcher<T>(
    pageUrl: string,
): Promise<PaginatedResponse<T>> {
    const response = await fetch(pageUrl);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}
