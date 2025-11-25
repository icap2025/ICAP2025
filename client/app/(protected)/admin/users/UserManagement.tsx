"use client";

import Loading from "@/app/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { activateUser, deactivateUser, exportUsers, getAllUsers, getUserById, User } from "@/services/admin/users.service";
import { ChevronLeft, ChevronRight, Download, Eye, Search, UserCheck, UserX } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import * as XLSX from 'xlsx';

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [stats, setStats] = useState({
    totalPaidUsers: 0,
    totalUnpaidUsers: 0,
    totalUsers: 0,
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const limit = 10;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page on new search
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllUsers({
        page: currentPage,
        limit,
        search: debouncedSearchTerm,
        paymentStatus: paymentFilter,
      });

      setUsers(response.data.users);
      setTotalPages(response.data.pagination.totalPages);
      setTotalUsers(response.data.pagination.totalUsers);
      setStats(response.data.stats);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearchTerm, paymentFilter, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleViewUser = async (userId: string) => {
    try {
      const response = await getUserById(userId);
      setSelectedUser(response.data.user);
      setIsDialogOpen(true);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch user details");
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        await deactivateUser(userId);
        toast.success("User deactivated successfully");
      } else {
        await activateUser(userId);
        toast.success("User activated successfully");
      }
      fetchUsers(); // Refresh the list
    } catch (error: any) {
      toast.error(error.message || "Failed to update user status");
    }
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      toast.info(`Preparing to export ${totalUsers} users... This may take a moment.`);
      
      const response = await exportUsers({
        search: debouncedSearchTerm,
        paymentStatus: paymentFilter,
      });

      const users = response.data.users;

      if (!users || users.length === 0) {
        toast.warning("No users found to export");
        return;
      }

      // Prepare data for Excel
      const excelData = users.map(user => ({
        'Name': user.Name,
        'Email': user.email,
        'Phone': user.phone,
        'Affiliation': user.affiliation,
        'Designation': user.designation,
        'Abstract ID': user.abstractID || 'N/A',
        'Abstract Title': user.abstractTitle || 'N/A',
        'Participation Category': user.participationCategory,
        'Registration Category': user.registrationCategory,
        'Presenter Name': user.presenterName || 'N/A',
        'Co-Authors': user.CoAuthorNames || 'N/A',
        'Payment Status': user.payment_status ? 'Paid' : 'Unpaid',
        'Payment Date': user.payment_date ? new Date(user.payment_date).toLocaleDateString() : 'N/A',
        'Amount': user.amount || 'N/A',
        'Payment ID': user.SuccessPaymentID || 'N/A',
        'Account Status': user.isActive ? 'Active' : 'Inactive',
        'Email Verified': user.isEmailVerified ? 'Yes' : 'No',
        'Registered Date': new Date(user.createdAt).toLocaleDateString(),
      }));

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(excelData);
      
      // Set column widths
      const colWidths = [
        { wch: 20 }, // Name
        { wch: 30 }, // Email
        { wch: 15 }, // Phone
        { wch: 30 }, // Affiliation
        { wch: 20 }, // Designation
        { wch: 15 }, // Abstract ID
        { wch: 40 }, // Abstract Title
        { wch: 20 }, // Participation Category
        { wch: 25 }, // Registration Category
        { wch: 20 }, // Presenter Name
        { wch: 30 }, // Co-Authors
        { wch: 15 }, // Payment Status
        { wch: 15 }, // Payment Date
        { wch: 10 }, // Amount
        { wch: 20 }, // Payment ID
        { wch: 15 }, // Account Status
        { wch: 15 }, // Email Verified
        { wch: 15 }, // Registered Date
      ];
      ws['!cols'] = colWidths;

      // Create workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Users');

      // Generate filename with timestamp and filter
      const filterText = paymentFilter === 'all' ? 'all' : paymentFilter;
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `users_${filterText}_${timestamp}.xlsx`;

      // Download
      XLSX.writeFile(wb, filename);
      toast.success(`Exported ${users.length} users successfully`);
    } catch (error: any) {
      console.error('Export error:', error);
      toast.error(error.message || "Failed to export users");
    } finally {
      setExporting(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // Page reset is handled in the debounce useEffect
  };

  const handleFilterChange = (value: 'all' | 'paid' | 'unpaid') => {
    setPaymentFilter(value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  if (loading && currentPage === 1) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Users Management
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage all registered users and their details
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Paid Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.totalPaidUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Unpaid Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.totalUnpaidUsers}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>All Users ({totalUsers})</CardTitle>
              <CardDescription>
                View and manage user accounts
              </CardDescription>
            </div>
            <Button 
              onClick={handleExport}
              disabled={exporting || totalUsers === 0}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              {exporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export to Excel ({totalUsers} users)
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, email, or abstract ID..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={paymentFilter} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="paid">Paid Only</SelectItem>
                <SelectItem value="unpaid">Unpaid Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Abstract ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr 
                    key={user._id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleViewUser(user._id)}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.Name}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {user.abstractID || 'N/A'}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge variant="outline">
                        {user.participationCategory}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge variant={user.payment_status ? "default" : "secondary"}>
                        {user.payment_status ? "Paid" : "Pending"}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge variant={user.isActive ? "default" : "destructive"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewUser(user._id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={user.isActive ? "destructive" : "default"}
                          onClick={() => handleToggleStatus(user._id, user.isActive)}
                        >
                          {user.isActive ? (
                            <UserX className="h-4 w-4" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No users found
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages} ({totalUsers} total users)
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1 || loading}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages || loading}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Complete information about the selected user
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedUser.Name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedUser.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Affiliation</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedUser.affiliation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Designation</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedUser.designation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Abstract ID</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedUser.abstractID || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-600">Abstract Title</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedUser.abstractTitle || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Participation Category</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedUser.participationCategory}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Registration Category</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedUser.registrationCategory}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Presenter Name</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedUser.presenterName || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Co-Authors</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedUser.CoAuthorNames || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Payment Status</label>
                  <div>
                    <Badge variant={selectedUser.payment_status ? "default" : "secondary"}>
                      {selectedUser.payment_status ? "Paid" : "Unpaid"}
                    </Badge>
                  </div>
                </div>
                {selectedUser.payment_status && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Payment Date</label>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {selectedUser.payment_date ? new Date(selectedUser.payment_date).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Amount</label>
                      <p className="text-sm text-gray-900 dark:text-white">{selectedUser.amount || 'N/A'}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-600">Payment ID</label>
                      <p className="text-sm text-gray-900 dark:text-white">{selectedUser.SuccessPaymentID || 'N/A'}</p>
                    </div>
                  </>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-600">Account Status</label>
                  <div>
                    <Badge variant={selectedUser.isActive ? "default" : "destructive"}>
                      {selectedUser.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email Verified</label>
                  <div>
                    <Badge variant={selectedUser.isEmailVerified ? "default" : "secondary"}>
                      {selectedUser.isEmailVerified ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Registered Date</label>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Updated</label>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {new Date(selectedUser.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
