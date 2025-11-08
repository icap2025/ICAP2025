import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PaymentData {
  paymentID: string;
  paymentStatusCode: string;
  paymentAmount: string;
  paymentTime: string;
  paymentMethod?: string;
  payerName?: string;
  payerEmail?: string;
  payerMobile?: string;
  bankTransactionID?: string;
  [key: string]: any;
}

interface UserData {
  Name: string;
  email: string;
  phone?: string;
  registrationCategory?: string;
  _id: string;
  payment_date?: string;
}

type RGB = [number, number, number];

const COLORS = {
  primary: [21, 128, 61] as RGB, // Green 700
  primaryLight: [34, 197, 94] as RGB, // Green 500
  secondary: [31, 41, 55] as RGB, // Gray 800
  accent: [5, 150, 105] as RGB, // Emerald 600
  success: [22, 163, 74] as RGB, // Green 600
  error: [220, 38, 38] as RGB, // Red 600
  lightGray: [249, 250, 251] as RGB, // Gray 50
  mediumGray: [107, 114, 128] as RGB, // Gray 500
  darkGray: [55, 65, 81] as RGB, // Gray 700
  border: [229, 231, 235] as RGB, // Gray 200
  tableBg: [240, 253, 244] as RGB, // Green 50
  white: [255, 255, 255] as RGB,
  black: [0, 0, 0] as RGB,
} as const;

const FONTS = {
  title: { size: 20, style: 'bold' as const },
  subtitle: { size: 9, style: 'normal' as const },
  heading: { size: 14, style: 'bold' as const },
  subheading: { size: 11, style: 'bold' as const },
  body: { size: 9, style: 'normal' as const },
  bodyBold: { size: 9, style: 'bold' as const },
  small: { size: 8, style: 'normal' as const },
  tiny: { size: 7, style: 'normal' as const },
} as const;

const MARGINS = {
  page: 10,
  content: 15,
  section: 15,
} as const;

const formatCurrency = (amount: string | number): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `BDT ${numAmount.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatDateTime = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return 'Invalid Date';
  }
};

const addHeader = (doc: jsPDF): void => {
  // Green header background
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, 210, 38, 'F');
  
  // Accent line
  doc.setFillColor(...COLORS.primaryLight);
  doc.rect(0, 38, 210, 2, 'F');

  // Conference title
  doc.setFontSize(FONTS.title.size);
  doc.setTextColor(...COLORS.white);
  doc.setFont('helvetica', FONTS.title.style);
  doc.text('ICAP 2025', 105, 14, { align: 'center' });

  // Conference details
  doc.setFontSize(FONTS.subtitle.size);
  doc.setFont('helvetica', FONTS.subtitle.style);
  doc.text('International Conference on Advanced Computing and Simulation', 105, 21, { align: 'center' });
  doc.text('Shahjalal University of Science and Technology, Sylhet, Bangladesh', 105, 27, { align: 'center' });
  doc.text('December 17-18, 2025', 105, 33, { align: 'center' });
};

const addTitle = (doc: jsPDF): void => {
  // Receipt title box
  doc.setFillColor(...COLORS.tableBg);
  doc.rect(MARGINS.content, 48, 180, 16, 'F');
  
  doc.setDrawColor(...COLORS.primary);
  doc.setLineWidth(0.5);
  doc.rect(MARGINS.content, 48, 180, 16);
  
  doc.setFontSize(FONTS.heading.size);
  doc.setTextColor(...COLORS.primary);
  doc.setFont('helvetica', FONTS.heading.style);
  doc.text('PAYMENT RECEIPT', 105, 56, { align: 'center' });
  
  doc.setFontSize(FONTS.small.size);
  doc.setTextColor(...COLORS.mediumGray);
  doc.setFont('helvetica', 'normal');
  doc.text(`Receipt No: ${Date.now().toString().slice(-10)}`, 105, 61, { align: 'center' });
};

const addStatusBadge = (doc: jsPDF, status: string): void => {
  const isPaid = status === 'PAID' || status === 'COMPLETED';
  const badgeColor = isPaid ? COLORS.success : COLORS.error;
  const statusText = isPaid ? 'PAYMENT VERIFIED' : '✗ PAYMENT FAILED';

  // Badge shadow
  doc.setFillColor(200, 200, 200);
  doc.roundedRect(61, 72, 88, 11, 2, 2, 'F');
  
  // Badge background
  doc.setFillColor(...badgeColor);
  doc.roundedRect(60, 71, 90, 11, 2, 2, 'F');
  
  // Badge text
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.white);
  doc.setFont('helvetica', 'bold');
  doc.text(statusText, 105, 77.5, { align: 'center' });
};

const addPaymentDetails = (doc: jsPDF, paymentData: PaymentData, userData: UserData): number => {
  const startY = 90;

  // Section header
  doc.setFillColor(...COLORS.primary);
  doc.rect(MARGINS.content, startY, 180, 7, 'F');
  
  doc.setFontSize(FONTS.subheading.size);
  doc.setTextColor(...COLORS.white);
  doc.setFont('helvetica', FONTS.subheading.style);
  doc.text('PAYMENT INFORMATION', MARGINS.content + 3, startY + 5);

  const paymentDetails = [
    ['Transaction ID:', paymentData.paymentID || 'N/A'],
    ['Amount Paid:', formatCurrency(paymentData.paymentAmount || '0')],
    ['Payment Date & Time:', formatDateTime(userData.payment_date || paymentData.paymentTime)],
    ['Payment Method:', paymentData.paymentMethod || 'Online Payment'],
    ['Transaction Status:', paymentData.paymentStatusCode || 'N/A'],
    ...(paymentData.bankTransactionID ? [['Bank Transaction ID:', paymentData.bankTransactionID]] : []),
  ];

  autoTable(doc, {
    startY: startY + 8,
    head: [],
    body: paymentDetails,
    theme: 'grid',
    margin: { left: MARGINS.content, right: MARGINS.content },
    styles: {
      fontSize: FONTS.body.size,
      cellPadding: 4,
      lineColor: COLORS.border,
      lineWidth: 0.3,
      textColor: COLORS.black,
    },
    columnStyles: {
      0: { 
        fontStyle: 'bold', 
        textColor: COLORS.secondary, 
        cellWidth: 60,
        fillColor: COLORS.tableBg,
      },
      1: { 
        textColor: COLORS.secondary,
        fillColor: COLORS.white,
      },
    },
    headStyles: {
      fillColor: COLORS.primary,
      textColor: COLORS.white,
      fontStyle: 'bold',
    },
  });

  return (doc as any).lastAutoTable.finalY;
};

const addParticipantDetails = (doc: jsPDF, userData: UserData, paymentData: PaymentData): number => {
  const currentY = (doc as any).lastAutoTable.finalY + 10;

  // Section header
  doc.setFillColor(...COLORS.primary);
  doc.rect(MARGINS.content, currentY, 180, 7, 'F');
  
  doc.setFontSize(FONTS.subheading.size);
  doc.setTextColor(...COLORS.white);
  doc.setFont('helvetica', FONTS.subheading.style);
  doc.text('PARTICIPANT INFORMATION', MARGINS.content + 3, currentY + 5);

  const participantDetails = [
    ['Full Name:', userData.Name || 'N/A'],
    ['Email Address:', userData.email || 'N/A'],
    ['Contact Number:', userData.phone || 'N/A'],
    ['Registration Category:', userData.registrationCategory || 'N/A'],
    ['Participant ID:', userData._id || 'N/A'],
  ];

  autoTable(doc, {
    startY: currentY + 8,
    head: [],
    body: participantDetails,
    theme: 'grid',
    margin: { left: MARGINS.content, right: MARGINS.content },
    styles: {
      fontSize: FONTS.body.size,
      cellPadding: 4,
      lineColor: COLORS.border,
      lineWidth: 0.3,
      textColor: COLORS.black,
    },
    columnStyles: {
      0: { 
        fontStyle: 'bold', 
        textColor: COLORS.secondary, 
        cellWidth: 60,
        fillColor: COLORS.tableBg,
      },
      1: { 
        textColor: COLORS.secondary,
        fillColor: COLORS.white,
      },
    },
    headStyles: {
      fillColor: COLORS.primary,
      textColor: COLORS.white,
      fontStyle: 'bold',
    },
  });

  return (doc as any).lastAutoTable.finalY;
};

const addFooter = (doc: jsPDF, footerY: number): void => {
  const footerStartY = Math.min(footerY + 15, 250);
  
  // Important notes section
  doc.setFillColor(...COLORS.tableBg);
  doc.rect(MARGINS.content, footerStartY, 180, 18, 'F');
  
  doc.setDrawColor(...COLORS.primary);
  doc.setLineWidth(0.5);
  doc.rect(MARGINS.content, footerStartY, 180, 18);
  
  doc.setFontSize(FONTS.small.size);
  doc.setTextColor(...COLORS.secondary);
  doc.setFont('helvetica', 'bold');
  doc.text('Important Notes:', MARGINS.content + 3, footerStartY + 5);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(FONTS.tiny.size);
  doc.text('• This is a computer-generated receipt. No signature required.', MARGINS.content + 3, footerStartY + 9);
  doc.text('• Please present this receipt at the conference registration desk.', MARGINS.content + 3, footerStartY + 13);

  const currentDate = formatDateTime(new Date().toISOString());
  doc.setFontSize(FONTS.tiny.size);
  doc.setTextColor(...COLORS.mediumGray);
  doc.text(`Generated: ${currentDate}`, 105, footerStartY + 23, { align: 'center' });

  // Footer separator
  doc.setDrawColor(...COLORS.primaryLight);
  doc.setLineWidth(1);
  doc.line(MARGINS.content, footerStartY + 27, 195, footerStartY + 27);
  
  // Contact info
  doc.setFontSize(FONTS.tiny.size);
  doc.setTextColor(...COLORS.darkGray);
  doc.setFont('helvetica', 'normal');
  doc.text('Email: icap2025@sust.edu  |  Website: https://icap2025.sust.edu', 105, footerStartY + 32, { align: 'center' });
  doc.text('Shahjalal University of Science and Technology, Sylhet-3114, Bangladesh', 105, footerStartY + 36, { align: 'center' });
};

const getPaymentDataFromCookies = (): PaymentData | null => {
  try {
    // Get payment data from cookies
    const paymentIDMatch = document.cookie.match(new RegExp('(^| )Payment_ID=([^;]+)'));
    const paymentID = paymentIDMatch ? decodeURIComponent(paymentIDMatch[2]) : null;

    const amountMatch = document.cookie.match(new RegExp('(^| )Amount=([^;]+)'));
    const paymentAmount = amountMatch ? decodeURIComponent(amountMatch[2]) : null;

    const dateMatch = document.cookie.match(new RegExp('(^| )user_payment_date=([^;]+)'));
    const paymentTime = dateMatch ? decodeURIComponent(dateMatch[2]) : null;

    const statusMatch = document.cookie.match(new RegExp('(^| )user_payment_status=([^;]+)'));
    const paymentStatus = statusMatch ? decodeURIComponent(statusMatch[2]) : null;

    if (!paymentID || !paymentAmount) {
      return null;
    }

    return {
      paymentID,
      paymentStatusCode: paymentStatus? 'PAID' : 'UNPAID',
      paymentAmount,
      paymentTime: paymentTime || new Date().toISOString(),
      paymentMethod: 'Online Payment',
    };
  } catch (error) {
    console.error('Error reading payment data from cookies:', error);
    return null;
  }
};

export const generatePayslip = ( userData: UserData): void => {
  try {
    // If paymentData is not provided, get it from cookies
    let data: PaymentData | null = null;
    if (!data) {
      data = getPaymentDataFromCookies();
    }

    if (!data) {
      throw new Error('Payment data not found. Please ensure payment is completed.');
    }

    const doc = new jsPDF();

    // Add professional page border
    doc.setDrawColor(...COLORS.primary);
    doc.setLineWidth(1.5);
    doc.rect(5, 5, 200, 287);
    
    // Add inner border
    doc.setDrawColor(...COLORS.primaryLight);
    doc.setLineWidth(0.5);
    doc.rect(8, 8, 194, 281);

    addHeader(doc);
    addTitle(doc);
    addStatusBadge(doc, data.paymentStatusCode);
    addPaymentDetails(doc, data, userData);
    const finalY = addParticipantDetails(doc, userData, data);
    addFooter(doc, finalY);

    const fileName = `ICAP2025_PaymentReceipt_${data.paymentID}.pdf`;
    doc.save(fileName);
    
    console.log(`Payment receipt generated successfully: ${fileName}`);
  } catch (error) {
    console.error('Error generating payment receipt:', error);
    throw new Error('Failed to generate payment receipt. Please try again.');
  }
};
