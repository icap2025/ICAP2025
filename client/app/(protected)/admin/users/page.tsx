"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, Search, UserCheck, UserX } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  _id: string;
  Name: string;
  email: string;
  affiliation: string;
  phone: string;
  participationCategory: string;
  registrationCategory: string;
  payment_status: boolean;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(
        (user) =>
          user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.affiliation.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      // TODO: Replace with actual API call
      // For now using mock data
      setTimeout(() => {
        const mockUsers: User[] = [
          {
            _id: "1",
            Name: "John Doe",
            email: "john@example.com",
            affiliation: "University of Example",
            phone: "+1234567890",
            participationCategory: "Oral",
            registrationCategory: "International Student",
            payment_status: true,
            isActive: true,
            isEmailVerified: true,
            createdAt: new Date().toISOString(),
          },
          {
            _id: "2",
            Name: "Jane Smith",
            email: "jane@example.com",
            affiliation: "Institute of Technology",
            phone: "+0987654321",
            participationCategory: "Poster",
            registrationCategory: "Local Professionals",
            payment_status: false,
            isActive: true,
            isEmailVerified: true,
            createdAt: new Date().toISOString(),
          },
        ];
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        setLoading(false);
      }, 500);
    } catch (error) {
      toast.error("Failed to fetch users");
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      // TODO: Implement actual API call
      const action = currentStatus ? "deactivate" : "activate";
      toast.success(`User ${action}d successfully`);

      // Update local state
      setUsers(
        users.map((u) =>
          u._id === userId ? { ...u, isActive: !currentStatus } : u,
        ),
      );
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Users Management
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Manage all registered users and their details
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
          <CardDescription>View and manage user accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search by name, email, or affiliation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Affiliation
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.Name}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {user.email}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {user.affiliation}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <Badge variant="outline">
                        {user.participationCategory}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <Badge
                        variant={user.payment_status ? "default" : "secondary"}
                      >
                        {user.payment_status ? "Paid" : "Pending"}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <Badge
                        variant={user.isActive ? "default" : "destructive"}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toast.info("View details coming soon")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={user.isActive ? "destructive" : "default"}
                          onClick={() =>
                            handleToggleStatus(user._id, user.isActive)
                          }
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

            {filteredUsers.length === 0 && (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                No users found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
