export interface HttpSuccessResponse<T> {
    data: T[];
    totalCount: number;
    success: boolean;
}