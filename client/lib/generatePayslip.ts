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
  primary: [11, 129, 117] as RGB,
  secondary: [45, 55, 72] as RGB,
  success: [34, 197, 94] as RGB,
  error: [239, 68, 68] as RGB,
  lightGray: [245, 245, 245] as RGB,
  mediumGray: [120, 120, 120] as RGB,
  darkGray: [80, 80, 80] as RGB,
  border: [200, 200, 200] as RGB,
  white: [255, 255, 255] as RGB,
} as const;

const FONTS = {
  title: { size: 24, style: 'bold' as const },
  subtitle: { size: 10, style: 'normal' as const },
  heading: { size: 18, style: 'bold' as const },
  subheading: { size: 12, style: 'bold' as const },
  body: { size: 10, style: 'normal' as const },
  small: { size: 9, style: 'normal' as const },
  tiny: { size: 8, style: 'normal' as const },
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
  doc.setFillColor(...COLORS.lightGray);
  doc.rect(MARGINS.page, MARGINS.page, 190, 30, 'F');

  doc.setFontSize(FONTS.title.size);
  doc.setTextColor(...COLORS.primary);
  doc.setFont('helvetica', FONTS.title.style);
  doc.text('ICAP 2025', 105, 20, { align: 'center' });

  doc.setFontSize(FONTS.subtitle.size);
  doc.setTextColor(...COLORS.secondary);
  doc.setFont('helvetica', FONTS.subtitle.style);
  doc.text('International Conference on Advanced Computing and Simulation', 105, 27, { align: 'center' });
  doc.text('Shahjalal University of Science and Technology', 105, 33, { align: 'center' });

  doc.setDrawColor(...COLORS.primary);
  doc.setLineWidth(0.5);
  doc.line(MARGINS.content, 37, 195, 37);
};

const addTitle = (doc: jsPDF): void => {
  doc.setFontSize(FONTS.heading.size);
  doc.setTextColor(...COLORS.primary);
  doc.setFont('helvetica', FONTS.heading.style);
  doc.text('PAYMENT RECEIPT', 105, 48, { align: 'center' });
};

const addStatusBadge = (doc: jsPDF, status: string): void => {
  const isPaid = status === 'PAID' || status === 'COMPLETED';
  const badgeColor = isPaid ? COLORS.success : COLORS.error;
  const statusText = status.toUpperCase();

  doc.setFillColor(...badgeColor);
  doc.roundedRect(70, 52, 70, 10, 2, 2, 'F');
  
  doc.setFontSize(FONTS.subheading.size);
  doc.setTextColor(...COLORS.white);
  doc.setFont('helvetica', 'bold');
  doc.text(statusText, 105, 58.5, { align: 'center' });
};

const addPaymentDetails = (doc: jsPDF, paymentData: PaymentData, userData: UserData): number => {
  const startY = 70;

  doc.setFontSize(FONTS.subheading.size);
  doc.setTextColor(...COLORS.secondary);
  doc.setFont('helvetica', FONTS.subheading.style);
  doc.text('Payment Information', MARGINS.content, startY);

  const paymentDetails = [
    ['Transaction ID', paymentData.paymentID || 'N/A'],
    ['Amount Paid', formatCurrency(paymentData.paymentAmount || '0')],
    ['Payment Date', formatDateTime(userData.payment_date || paymentData.paymentTime)],
    ['Payment Method', paymentData.paymentMethod || 'Online Payment'],
    ['Transaction Status', paymentData.paymentStatusCode || 'N/A'],
    ...(paymentData.bankTransactionID ? [['Bank Transaction ID', paymentData.bankTransactionID]] : []),
  ];

  autoTable(doc, {
    startY: startY + 5,
    head: [],
    body: paymentDetails,
    theme: 'plain',
    margin: { left: MARGINS.content, right: MARGINS.content },
    styles: {
      fontSize: FONTS.body.size,
      cellPadding: 4,
      lineColor: COLORS.border,
      lineWidth: 0.1,
    },
    columnStyles: {
      0: { 
        fontStyle: 'bold', 
        textColor: COLORS.secondary, 
        cellWidth: 60,
      },
      1: { 
        textColor: COLORS.darkGray,
      },
    },
    alternateRowStyles: {
      fillColor: COLORS.lightGray,
    },
  });

  return (doc as any).lastAutoTable.finalY;
};

const addParticipantDetails = (doc: jsPDF, userData: UserData, paymentData: PaymentData): number => {
  const currentY = (doc as any).lastAutoTable.finalY + 12;

  doc.setFontSize(FONTS.subheading.size);
  doc.setTextColor(...COLORS.secondary);
  doc.setFont('helvetica', FONTS.subheading.style);
  doc.text('Participant Information', MARGINS.content, currentY);

  const participantDetails = [
    ['Full Name', userData.Name || 'N/A'],
    ['Email Address', userData.email || 'N/A'],
    ['Contact Number', userData.phone || 'N/A'],
    ['Registration Category', userData.registrationCategory || 'N/A'],
    ['Participant ID', userData._id || 'N/A'],
  ];

  autoTable(doc, {
    startY: currentY + 5,
    head: [],
    body: participantDetails,
    theme: 'plain',
    margin: { left: MARGINS.content, right: MARGINS.content },
    styles: {
      fontSize: FONTS.body.size,
      cellPadding: 4,
      lineColor: COLORS.border,
      lineWidth: 0.1,
    },
    columnStyles: {
      0: { 
        fontStyle: 'bold', 
        textColor: COLORS.secondary, 
        cellWidth: 60,
      },
      1: { 
        textColor: COLORS.darkGray,
      },
    },
    alternateRowStyles: {
      fillColor: COLORS.lightGray,
    },
  });

  return (doc as any).lastAutoTable.finalY;
};

const addFooter = (doc: jsPDF, footerY: number): void => {
  const footerStartY = Math.min(footerY + 15, 260);
  
  doc.setDrawColor(...COLORS.primary);
  doc.setLineWidth(0.3);
  doc.line(MARGINS.content, footerStartY, 195, footerStartY);

  const currentDate = formatDateTime(new Date().toISOString());

  doc.setFontSize(FONTS.small.size);
  doc.setTextColor(...COLORS.mediumGray);
  doc.setFont('helvetica', FONTS.small.style);
  doc.text('This is a computer-generated receipt and does not require a signature.', 105, footerStartY + 6, { align: 'center' });
  doc.text(`Generated on: ${currentDate}`, 105, footerStartY + 11, { align: 'center' });

  doc.setFontSize(FONTS.tiny.size);
  doc.text('For queries, contact: icap2025@sust.edu', 105, footerStartY + 18, { align: 'center' });
  doc.text('Website: https://icap2025.sust.edu', 105, footerStartY + 23, { align: 'center' });
};

export const generatePayslip = (paymentData: PaymentData, userData: UserData): void => {
  try {
    const doc = new jsPDF();

    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.5);
    doc.rect(MARGINS.page, MARGINS.page, 190, 277);

    addHeader(doc);
    addTitle(doc);
    addStatusBadge(doc, paymentData.paymentStatusCode);
    addPaymentDetails(doc, paymentData, userData);
    const finalY = addParticipantDetails(doc, userData, paymentData);
    addFooter(doc, finalY);

    const fileName = `ICAP2025_Receipt_${paymentData.paymentID}_${Date.now()}.pdf`;
    doc.save(fileName);
    
    console.log(`Payment receipt generated successfully: ${fileName}`);
  } catch (error) {
    console.error('Error generating payment receipt:', error);
    throw new Error('Failed to generate payment receipt. Please try again.');
  }
};
