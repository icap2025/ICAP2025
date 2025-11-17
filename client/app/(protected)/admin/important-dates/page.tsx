"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Reports
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Generate and view system reports
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            System Reports
          </CardTitle>
          <CardDescription>Download and analyze reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-12 text-center text-gray-500 dark:text-gray-400">
            <FileText className="mx-auto mb-4 h-12 w-12 opacity-50" />
            <p className="text-lg">Reports generation coming soon</p>
            <p className="mt-2 text-sm">This feature is under development</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
