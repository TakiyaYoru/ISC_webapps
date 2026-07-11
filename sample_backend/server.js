require('dotenv').config();
const express = require('express');
const cors = require('cors');
const moment = require('moment');
const crypto = require('crypto');
const qs = require('qs');

const app = express();
app.use(cors());
app.use(express.json());

// MOMO SANDBOX CONFIGURATION
const momo_PartnerCode = process.env.MOMO_PARTNER_CODE;
const momo_AccessKey = process.env.MOMO_ACCESS_KEY;
const momo_SecretKey = process.env.MOMO_SECRET_KEY;
const momo_ApiUrl = 'https://test-payment.momo.vn/v2/gateway/api/create';
const momo_ReturnUrl = 'http://localhost:5173/order-success'; 
const momo_IpnUrl = 'http://localhost:3000/api/payments/momo_ipn';

// VNPAY SANDBOX CONFIGURATION 
const vnp_TmnCode = process.env.VNPAY_TMNCODE; 
const vnp_HashSecret = process.env.VNPAY_HASHSECRET; 
const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
const vnp_ReturnUrl = 'http://localhost:5173/order-success'; 

// ALEPAY SANDBOX CONFIGURATION
const alepay_TokenKey = process.env.ALEPAY_TOKEN_KEY;
const alepay_ChecksumKey = process.env.ALEPAY_CHECKSUM_KEY;
const alepay_EncryptKey = process.env.ALEPAY_ENCRYPT_KEY; 
const alepay_ApiUrl = 'https://alepay-v3-sandbox.nganluong.vn/api/v3/checkout/request-payment';
const alepay_ReturnUrl = 'http://localhost:5173/order-success';

app.post('/api/payments/create_payment_url', async (req, res) => {
  const { total, note, method } = req.body;

  // --- MOMO PAYMENT FLOW ---
  if (method === 'momo') {
    let orderId = 'MOMO' + moment(new Date()).format('DDHHmmss');
    let requestId = orderId; 
    let orderInfo = note || "Payment via MoMo";
    let requestType = "captureWallet"; 
    let extraData = ""; 
    
    let rawSignature = `accessKey=${momo_AccessKey}&amount=${total}&extraData=${extraData}&ipnUrl=${momo_IpnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${momo_PartnerCode}&redirectUrl=${momo_ReturnUrl}&requestId=${requestId}&requestType=${requestType}`;
    let signature = crypto.createHmac('sha256', momo_SecretKey).update(rawSignature).digest('hex');
    
    const requestBody = {
      partnerCode: momo_PartnerCode,
      accessKey: momo_AccessKey,
      requestId: requestId,
      amount: total,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: momo_ReturnUrl,
      ipnUrl: momo_IpnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: 'vi'
    };

    try {
      const response = await fetch(momo_ApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      const responseData = await response.json();

      if (responseData.payUrl) {
        return res.status(200).json({ checkoutUrl: responseData.payUrl });
      } else {
        return res.status(400).json({ error: responseData.message || 'MoMo connection failed' });
      }
    } catch (error) {
      console.error("MoMo Gateway Error:", error);
      return res.status(500).json({ error: 'Internal Server Error during MoMo setup' });
    }
  } 
  
  // --- VNPAY PAYMENT FLOW ---
  else if (method === 'vnpay') {
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    let orderId = 'VNPAY' + moment(date).format('DDHHmmss');
    let ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = vnp_TmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = 'VND';
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = note || 'Payment via VNPAY';
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = total * 100; 
    vnp_Params['vnp_ReturnUrl'] = vnp_ReturnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;

    vnp_Params = sortObject(vnp_Params);

    let signData = qs.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", vnp_HashSecret);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex"); 
    
    vnp_Params['vnp_SecureHash'] = signed;
    let paymentUrl = vnp_Url + '?' + qs.stringify(vnp_Params, { encode: false });

    return res.status(200).json({ checkoutUrl: paymentUrl });
  }

  // --- ALEPAY PAYMENT FLOW ---
  else if (method === 'alepay') {
    let orderCode = 'ALEPAY' + moment(new Date()).format('DDHHmmss');
    let orderDescription = note || "Payment via AlePay";
    
    const payload = {
      tokenKey: alepay_TokenKey,
      orderCode: orderCode,
      amount: total,
      currency: "VND",
      orderDescription: orderDescription,
      totalItem: 1,
      checkoutType: 1, 
      returnUrl: alepay_ReturnUrl,
      cancelUrl: "http://localhost:5173/",
      buyerName: "Customer Name", 
      buyerEmail: "test@domain.com",
      buyerPhone: "0987654321",
      buyerAddress: "Delivery Address",
      buyerCity: "Ho Chi Minh",
      buyerCountry: "VN",
      paymentHours: 24
    };

    const rawDataString = JSON.stringify(payload);
    const signature = crypto.createHmac('sha256', alepay_ChecksumKey).update(rawDataString).digest('hex');

    const requestBody = {
      tokenKey: alepay_TokenKey,
      data: rawDataString, 
      checksum: signature
    };

    try {
      const response = await fetch(alepay_ApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      const responseData = await response.json();

      if (responseData.code === '000' && responseData.checkoutUrl) {
        return res.status(200).json({ checkoutUrl: responseData.checkoutUrl });
      } else {
        console.error("AlePay API rejected the request:", responseData);
        // Fallback to local MockGateway if Sandbox keys are not yet provided
        if (!alepay_TokenKey || alepay_TokenKey === 'YOUR_ALEPAY_TOKEN_KEY') {
           return res.status(200).json({ checkoutUrl: `http://localhost:5173/payment/gateway?method=alepay` });
        }
        return res.status(400).json({ error: responseData.message || 'AlePay connection failed' });
      }
    } catch (error) {
      console.error("AlePay Gateway Error:", error);
      return res.status(500).json({ error: 'Internal Server Error during AlePay setup' });
    }
  } 
  
  // --- INVALID METHOD FALLBACK ---
  else {
    return res.status(400).json({ error: 'Invalid payment method' });
  }
});

// Helper function to sort object keys alphabetically
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj){
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});