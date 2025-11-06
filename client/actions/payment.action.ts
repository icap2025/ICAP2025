import AUTHENTICATED_AXIOS_CLIENT from '@/lib/axios_clients/public_client';
import { UserData } from '@/lib/auth';
import { cookies } from 'next/headers';

interface PaymentData {
    name: string;
    _id: string;
    amount: number;
    email: string;
    mobile: string;
}

interface FeeStructure {
    earlyBird: number;
    regular: number;
}

/**
 * Calculate registration fee based on category and current date
 * Early Bird Deadline: November 20, 2025
 * Regular Registration Deadline: December 10, 2025
 */
export const calculateRegistrationFee = (
    registrationCategory: string | undefined,
    currentDate: Date = new Date()
): number => {
    if (!registrationCategory) {
        throw new Error('Registration category is required');
    }

    // Early Bird Deadline: November 20, 2025
    const earlyBirdDeadline = new Date('2025-11-20T23:59:59');
    const isEarlyBird = currentDate <= earlyBirdDeadline;

    // Fee structure based on registration category
    const feeStructure: Record<string, FeeStructure> = {
        'International Professionals': { earlyBird: 36600, regular: 48800 },      // USD
        'International Student': { earlyBird: 18300, regular: 24400 },            // USD
        'Local Professionals': { earlyBird: 4000, regular: 5000 },            // BDT
        'Local Student': { earlyBird: 2000, regular: 2500 },                  // BDT
    };

    const fees = feeStructure[registrationCategory];
    
    if (!fees) {
        throw new Error(`Invalid registration category: ${registrationCategory}`);
    }

    return isEarlyBird ? fees.earlyBird : fees.regular;
};

/**
 * Get fee details including currency and amount
 */


export const createPayment = async (userData: UserData | null) => {
    try {
        if (!userData) {
            console.error('Payment error: User data is null or undefined');
            throw new Error('User data is required for payment');
        }

        if (!userData.registrationCategory) {
            console.error('Payment error: Registration category is missing');
            throw new Error('Registration category is required for payment calculation');
        }

        if (!userData.phone) {
            console.error('Payment error: Phone number is missing');
            throw new Error('Phone number is required for payment');
        }

        // Calculate payment amount based on registration category and current date
        const calculatedAmount = calculateRegistrationFee(userData.registrationCategory);
        
        console.log('Payment calculation:', {
            category: userData.registrationCategory,
            amount: calculatedAmount,
            isEarlyBird: new Date() <= new Date('2025-11-20T23:59:59')
        });

        const paymentData: PaymentData = {
            name: userData.Name || '',
            _id: userData._id || '',
            amount: 1,
            email: userData.email || '',
            mobile: userData.phone || ''
        };

        console.log('Creating payment with data:', paymentData);

        const response = await AUTHENTICATED_AXIOS_CLIENT.post(
            '/api/payment/create', 
            paymentData
        );
        
        console.log('Payment response:', response.data);
    
        if (!response.data?.success) {
            throw new Error('Payment creation failed');
        }

        // Set Payment_ID cookie
        const paymentID = response.data?.data?.data?.paymentID; 
        if (paymentID) {
            document.cookie = `Payment_ID=${paymentID}; path=/; max-age=${60 * 10}; SameSite=Lax`;
        }
        return response.data;

    } catch (error: any) {
        console.error('Payment error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            stack: error.stack
        });
        
        const errorMessage = error.response?.data?.message 
            || error.message 
            || 'Failed to create payment. Please try again.';
        
        throw new Error(errorMessage);
    }
};



export const getPaymentStatus = async () => {
    try {
        // Retrieve Payment_ID from cookies
        const paymentIDMatch = document.cookie.match(new RegExp('(^| )Payment_ID=([^;]+)'));
        const userIDMatch = document.cookie.match(new RegExp('(^| )user_id=([^;]+)'));
        
        const paymentID = paymentIDMatch ? paymentIDMatch[2] : null;
        const _id = userIDMatch ? userIDMatch[2] : null;
        
        if (!paymentID) {
            throw new Error('Payment ID not found. Payment may not have been initiated yet.');
        }

        if (!_id) {
            throw new Error('User ID not found. Please log in again.');
        }

        console.log('Fetching payment status for:', { paymentID, _id });

        const response = await AUTHENTICATED_AXIOS_CLIENT.post(
            '/api/payment/status',
            { paymentID, _id }
        );
        
        console.log('Payment status response:', response.data);

        // If payment is successful, update cookies
        if (response.data?.status === 'PAID') {
            document.cookie = `user_payment_status=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
            
            // Store payment date in cookies
            if (response.data.payment_date) {
                document.cookie = `user_payment_date=${response.data.payment_date}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
            }
            
            // Clear temporary Payment_ID cookie
            document.cookie = `Payment_ID=; path=/; max-age=0; SameSite=Lax`;
        }
      
        return response.data;
        
    } catch (error: any) {
        console.error('Payment status error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        
        const errorMessage = error.response?.data?.message 
            || error.message 
            || 'Failed to fetch payment status. Please try again.';
        
        throw new Error(errorMessage);
    }
};