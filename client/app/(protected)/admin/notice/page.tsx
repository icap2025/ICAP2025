"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Payments Management
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          View and manage user payments
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Records
          </CardTitle>
          <CardDescription>Track all payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-12 text-center text-gray-500 dark:text-gray-400">
            <CreditCard className="mx-auto mb-4 h-12 w-12 opacity-50" />
            <p className="text-lg">Payment management coming soon</p>
            <p className="mt-2 text-sm">This feature is under development</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
