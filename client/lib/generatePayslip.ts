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

export const generatePayslip = (paymentData: PaymentData, userData: UserData) => {
  const doc = new jsPDF();
  console.log("date"+ userData.payment_date);
  
  // Define colors
  const primaryColor: [number, number, number] = [11, 129, 117]; // #0B8175
  const secondaryColor: [number, number, number] = [45, 55, 72];
  const lightGray: [number, number, number] = [245, 245, 245];
  
  // Add header background
  doc.setFillColor(...lightGray);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Add ICAP logo text (you can replace this with an actual logo image if you have it)
  doc.setFontSize(24);
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('ICAP 2025', 105, 15, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(...secondaryColor);
  doc.setFont('helvetica', 'normal');
  doc.text('International Conference on Advanced Computing and Simulation', 105, 22, { align: 'center' });
  doc.text('Shahjalal University of Science and Technology', 105, 28, { align: 'center' });
  
  // Add divider line
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(15, 35, 195, 35);
  
  // Payment Receipt Title
  doc.setFontSize(18);
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('PAYMENT RECEIPT', 105, 48, { align: 'center' });
  
  // Status Badge
  const statusText = paymentData.paymentStatusCode === 'PAID' ? 'PAID' : paymentData.paymentStatusCode;
  doc.setFillColor(34, 197, 94); // Green
  doc.roundedRect(75, 52, 60, 10, 2, 2, 'F');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text(statusText, 105, 58.5, { align: 'center' });
  
  // Payment Details Section
  doc.setFontSize(12);
  doc.setTextColor(...secondaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Information', 15, 75);
  
  // Create payment details table
  const paymentDetails = [
    ['Payment ID', paymentData.paymentID || 'N/A'],
    ['Amount', `BDT ${parseFloat(paymentData.paymentAmount || '0').toLocaleString('en-BD', { minimumFractionDigits: 2 })}`],
    ['Payment Date', userData.payment_date ? new Date(userData.payment_date).toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }) : 'N/A'],
    ['Payment Method', paymentData.paymentMethod || 'Online Payment'],
    ['Status', paymentData.paymentStatusCode || 'N/A'],
  ];
  
  autoTable(doc, {
    startY: 80,
    head: [],
    body: paymentDetails,
    theme: 'plain',
    styles: {
      fontSize: 10,
      cellPadding: 5,
    },
    columnStyles: {
      0: { fontStyle: 'bold', textColor: secondaryColor, cellWidth: 60 },
      1: { textColor: [80, 80, 80] },
    },
    alternateRowStyles: {
      fillColor: lightGray,
    },
  });
  
  // Participant Details Section
  const currentY = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(12);
  doc.setTextColor(...secondaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Participant Information', 15, currentY);
  
  const participantDetails = [
    ['Name', userData.Name || 'N/A'],
    ['Email', userData.email || 'N/A'],
    ['Phone', userData.phone || 'N/A'],
    ['Registration Category', userData.registrationCategory || 'N/A'],
    ['Payment Date', paymentData.paymentTime ? new Date(paymentData.paymentTime).toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }) : (userData.payment_date ? new Date(userData.payment_date).toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }) : 'N/A')],
    ['User ID', userData._id || 'N/A'],
  ];
  
  autoTable(doc, {
    startY: currentY + 5,
    head: [],
    body: participantDetails,
    theme: 'plain',
    styles: {
      fontSize: 10,
      cellPadding: 5,
    },
    columnStyles: {
      0: { fontStyle: 'bold', textColor: secondaryColor, cellWidth: 60 },
      1: { textColor: [80, 80, 80] },
    },
    alternateRowStyles: {
      fillColor: lightGray,
    },
  });
  
  // Add footer
  const footerY = (doc as any).lastAutoTable.finalY + 20;
  
  // Add divider line
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.3);
  doc.line(15, footerY, 195, footerY);
  
  // Footer text
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.setFont('helvetica', 'normal');
  doc.text('This is a computer-generated receipt and does not require a signature.', 105, footerY + 7, { align: 'center' });
  doc.text(`Generated on: ${new Date().toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  })}`, 105, footerY + 12, { align: 'center' });
  
  // Add contact information
  doc.setFontSize(8);
  doc.text('For any queries, please contact: icap2025@sust.edu', 105, footerY + 20, { align: 'center' });
  doc.text('Website: https://icap2025.sust.edu', 105, footerY + 25, { align: 'center' });
  
  // Add border
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.rect(10, 10, 190, 277);
  
  // Save the PDF
  const fileName = `ICAP2025_Payment_Receipt_${paymentData.paymentID}.pdf`;
  doc.save(fileName);
};
