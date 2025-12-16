"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { generatePayslip } from '@/lib/generatePayslip';
import { FiDownload, FiPrinter } from 'react-icons/fi';
import { TbFileInvoice } from 'react-icons/tb';

interface PayslipFormData {
  // Payment Information
  paymentID: string;
  paymentAmount: string;
  paymentDate: string;
  paymentMethod: string;
  paymentStatus: string;
  bankTransactionID: string;

  // Participant Information
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  registrationCategory: string;
  participationCategory: string;
  participantId: string;
  affiliation: string;
  designation: string;

  // Abstract Details
  abstractId: string;
  abstractTitle: string;
  presenterName: string;
}

const ManualPayslipPage = () => {
  const [formData, setFormData] = useState<PayslipFormData>({
    paymentID: '',
    paymentAmount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'Online Payment',
    paymentStatus: 'PAID',
    bankTransactionID: '',
    participantName: '',
    participantEmail: '',
    participantPhone: '',
    registrationCategory: '',
    participationCategory: '',
    participantId: '',
    affiliation: '',
    designation: '',
    abstractId: '',
    abstractTitle: '',
    presenterName: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGeneratePayslip = () => {
    setIsGenerating(true);
    try {
      // Create cookie-like data structure for the payment
      const paymentData = {
        paymentID: formData.paymentID,
        paymentStatusCode: formData.paymentStatus,
        paymentAmount: formData.paymentAmount,
        paymentTime: new Date(formData.paymentDate).toISOString(),
        paymentMethod: formData.paymentMethod,
        bankTransactionID: formData.bankTransactionID || undefined,
      };

      // Create user data structure
      const userData = {
        Name: formData.participantName,
        email: formData.participantEmail,
        phone: formData.participantPhone,
        registrationCategory: formData.registrationCategory,
        participationCategory: formData.participationCategory,
        _id: formData.participantId,
        payment_date: new Date(formData.paymentDate).toISOString(),
        abstractId: formData.abstractId || undefined,
        abstractTitle: formData.abstractTitle || undefined,
        presenterName: formData.presenterName || undefined,
        affiliation: formData.affiliation || undefined,
        designation: formData.designation || undefined,
      };

      // Temporarily set cookies for the generatePayslip function
      const cookiesToSet = [
        { name: 'Payment_ID', value: paymentData.paymentID },
        { name: 'Amount', value: paymentData.paymentAmount },
        { name: 'user_payment_date', value: paymentData.paymentTime },
        { name: 'user_payment_status', value: paymentData.paymentStatusCode },
      ];

      // Set temporary cookies
      cookiesToSet.forEach(({ name, value }) => {
        document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=60`;
      });

      if (formData.abstractId) {
        document.cookie = `user_abstract_id=${encodeURIComponent(formData.abstractId)}; path=/; max-age=60`;
        document.cookie = `user_abstract_title=${encodeURIComponent(formData.abstractTitle)}; path=/; max-age=60`;
        document.cookie = `user_presenter_name=${encodeURIComponent(formData.presenterName)}; path=/; max-age=60`;
      }

      if (formData.affiliation) {
        document.cookie = `user_affiliation=${encodeURIComponent(formData.affiliation)}; path=/; max-age=60`;
      }

      if (formData.designation) {
        document.cookie = `user_designation=${encodeURIComponent(formData.designation)}; path=/; max-age=60`;
      }

      if (formData.participationCategory) {
        document.cookie = `user_participation_category=${encodeURIComponent(formData.participationCategory)}; path=/; max-age=60`;
      }

      // Generate the payslip
      generatePayslip(userData);

      // Clear temporary cookies after generation
      setTimeout(() => {
        cookiesToSet.forEach(({ name }) => {
          document.cookie = `${name}=; path=/; max-age=0`;
        });
        document.cookie = `user_abstract_id=; path=/; max-age=0`;
        document.cookie = `user_abstract_title=; path=/; max-age=0`;
        document.cookie = `user_presenter_name=; path=/; max-age=0`;
        document.cookie = `user_affiliation=; path=/; max-age=0`;
        document.cookie = `user_designation=; path=/; max-age=0`;
        document.cookie = `user_participation_category=; path=/; max-age=0`;
      }, 1000);

      alert('Payslip generated successfully!');
    } catch (error) {
      console.error('Error generating payslip:', error);
      alert('Failed to generate payslip. Please check the form data.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      paymentID: '',
      paymentAmount: '',
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'Online Payment',
      paymentStatus: 'PAID',
      bankTransactionID: '',
      participantName: '',
      participantEmail: '',
      participantPhone: '',
      registrationCategory: '',
      participationCategory: '',
      participantId: '',
      affiliation: '',
      designation: '',
      abstractId: '',
      abstractTitle: '',
      presenterName: '',
    });
  };

  const isFormValid = () => {
    return (
      formData.paymentID &&
      formData.paymentAmount &&
      formData.participantName &&
      formData.participantEmail &&
      formData.participantId
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <TbFileInvoice className="text-4xl text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">Generate Manual Payslip</h1>
        </div>
        <p className="text-gray-600">
          Fill in the participant and payment details to generate a payment receipt
        </p>
      </div>

      <div className="space-y-6">
        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-primary">Payment Information</CardTitle>
            <CardDescription>Enter the payment transaction details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentID" className="required">
                  Transaction ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="paymentID"
                  name="paymentID"
                  value={formData.paymentID}
                  onChange={handleInputChange}
                  placeholder="Enter transaction ID"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentAmount">
                  Amount (BDT) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="paymentAmount"
                  name="paymentAmount"
                  type="number"
                  value={formData.paymentAmount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentDate">Payment Date</Label>
                <Input
                  id="paymentDate"
                  name="paymentDate"
                  type="date"
                  value={formData.paymentDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Online Payment">Online Payment</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Mobile Banking">Mobile Banking</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <select
                  id="paymentStatus"
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="PAID">PAID</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="PENDING">PENDING</option>
                  <option value="FAILED">FAILED</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankTransactionID">Bank Transaction ID (Optional)</Label>
                <Input
                  id="bankTransactionID"
                  name="bankTransactionID"
                  value={formData.bankTransactionID}
                  onChange={handleInputChange}
                  placeholder="Enter bank transaction ID"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participant Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-primary">Participant Information</CardTitle>
            <CardDescription>Enter the participant&apos;s personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="participantName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="participantName"
                  name="participantName"
                  value={formData.participantName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="participantEmail">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="participantEmail"
                  name="participantEmail"
                  type="email"
                  value={formData.participantEmail}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="participantPhone">Contact Number</Label>
                <Input
                  id="participantPhone"
                  name="participantPhone"
                  value={formData.participantPhone}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="participantId">
                  Participant ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="participantId"
                  name="participantId"
                  value={formData.participantId}
                  onChange={handleInputChange}
                  placeholder="Enter participant ID"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationCategory">Registration Category</Label>
                <select
                  id="registrationCategory"
                  name="registrationCategory"
                  value={formData.registrationCategory}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select category</option>
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Professional">Professional</option>
                  <option value="International">International</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="participationCategory">Participation Category</Label>
                <select
                  id="participationCategory"
                  name="participationCategory"
                  value={formData.participationCategory}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select participation</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Online">Online</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="affiliation">Affiliation</Label>
                <Input
                  id="affiliation"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleInputChange}
                  placeholder="Enter institution/organization"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Enter designation"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Abstract Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-primary">Abstract Details (Optional)</CardTitle>
            <CardDescription>
              Enter abstract information if applicable
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="abstractId">Abstract ID</Label>
                <Input
                  id="abstractId"
                  name="abstractId"
                  value={formData.abstractId}
                  onChange={handleInputChange}
                  placeholder="Enter abstract ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="presenterName">Presenter Name</Label>
                <Input
                  id="presenterName"
                  name="presenterName"
                  value={formData.presenterName}
                  onChange={handleInputChange}
                  placeholder="Enter presenter name"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="abstractTitle">Abstract Title</Label>
                <Input
                  id="abstractTitle"
                  name="abstractTitle"
                  value={formData.abstractTitle}
                  onChange={handleInputChange}
                  placeholder="Enter abstract title"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 justify-end">
              <Button
                variant="outline"
                onClick={handleClearForm}
                className="min-w-32"
              >
                Clear Form
              </Button>
              <Button
                onClick={handleGeneratePayslip}
                disabled={!isFormValid() || isGenerating}
                className="min-w-32 bg-primary hover:bg-primary/90"
              >
                <FiDownload className="mr-2" />
                {isGenerating ? 'Generating...' : 'Generate & Download'}
              </Button>
            </div>
            {!isFormValid() && (
              <p className="text-sm text-red-500 mt-2 text-right">
                * Please fill in all required fields
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManualPayslipPage;
