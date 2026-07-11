// src/services/paymentService.ts
export type PaymentMethodType = 'cod' | 'momo' | 'vnpay' | 'alepay';

export interface OrderPayload {
  name: string;
  phone: string;
  note: string;
  items: any[]; 
  total: number;
  method: PaymentMethodType;
}

export const paymentService = {
  async createCheckoutUrl(orderData: OrderPayload): Promise<string> {
    try {
      // Call the API to your Backend (running on a different port, e.g., 3000)
      // Note: Change this URL to an environment variable in production
      const response = await fetch('http://localhost:3000/api/payments/create_payment_url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // The backend will return the real URL for VNPay Sandbox
      // Example: https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?...
      return data.checkoutUrl; 
    } catch (error) {
      console.error('Error calling payment API:', error);
      throw error;
    }
  }
};