import ADMIN_AXIOS_CLIENT from "@/lib/axios_clients/admin_client";

export interface User {
    _id: string;
    Name: string;
    email: string;
    affiliation: string;
    designation: string;
    phone: string;
    abstractID?: string;
    abstractTitle?: string;
    participationCategory: string;
    registrationCategory: string;
    presenterName?: string;
    CoAuthorNames?: string;
    payment_status: boolean;
    payment_date?: string;
    amount?: number;
    SuccessPaymentID?: string;
    isActive: boolean;
    isEmailVerified: boolean;
    profilePic?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UsersResponse {
    status: string;
    results: number;
    data: {
        users: User[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalUsers: number;
            limit: number;
        };
        stats: {
            totalPaidUsers: number;
            totalUnpaidUsers: number;
            totalUsers: number;
        };
    };
}

export interface ExportUsersResponse {
    status: string;
    results: number;
    data: {
        users: User[];
    };
}

export interface GetUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    paymentStatus?: 'all' | 'paid' | 'unpaid';
}

/**
 * Get all users with pagination and filters
 */
export const getAllUsers = async (params: GetUsersParams = {}): Promise<UsersResponse> => {
    try {
        const { page = 1, limit = 10, search = '', paymentStatus = 'all' } = params;

        const response = await ADMIN_AXIOS_CLIENT.get('/api/admin/users', {
            params: { page, limit, search, paymentStatus },
        });

        return response.data;
    } catch (error: any) {
        console.error('Get users error:', error);
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Failed to fetch users'
        );
    }
};

/**
 * Get all users for export (no pagination)
 */
export const exportUsers = async (params: Omit<GetUsersParams, 'page' | 'limit'> = {}): Promise<ExportUsersResponse> => {
    try {
        const { search = '', paymentStatus = 'all' } = params;

        const response = await ADMIN_AXIOS_CLIENT.get('/api/admin/users/export', {
            params: { search, paymentStatus },
            timeout: 60000, // 60 seconds for large exports
        });

        return response.data;
    } catch (error: any) {
        console.error('Export users error:', error);

        // Handle specific timeout error
        if (error.code === 'ECONNABORTED') {
            throw new Error('Export is taking too long. Please try with filters to reduce data size.');
        }

        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Failed to export users'
        );
    }
};

/**
 * Get single user by ID
 */
export const getUserById = async (userId: string): Promise<{ status: string; data: { user: User } }> => {
    try {
        const response = await ADMIN_AXIOS_CLIENT.get(`/api/admin/users/${userId}`);
        return response.data;
    } catch (error: any) {
        console.error('Get user error:', error);
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Failed to fetch user'
        );
    }
};

/**
 * Deactivate user
 */
export const deactivateUser = async (userId: string): Promise<{ status: string; data: { user: User } }> => {
    try {
        const response = await ADMIN_AXIOS_CLIENT.patch(`/api/admin/users/${userId}/deactivate`);
        return response.data;
    } catch (error: any) {
        console.error('Deactivate user error:', error);
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Failed to deactivate user'
        );
    }
};

/**
 * Activate user
 */
export const activateUser = async (userId: string): Promise<{ status: string; data: { user: User } }> => {
    try {
        const response = await ADMIN_AXIOS_CLIENT.patch(`/api/admin/users/${userId}/activate`);
        return response.data;
    } catch (error: any) {
        console.error('Activate user error:', error);
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Failed to activate user'
        );
    }
};
