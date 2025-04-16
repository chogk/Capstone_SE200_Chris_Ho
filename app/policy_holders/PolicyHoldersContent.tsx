"use client";

import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge"

interface PolicyHolder {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  policies: string[];
}

export default function PolicyHoldersContent({ userEmail }: { userEmail: string }) {

  const [holders, setHolders] = useState<PolicyHolder[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 5;  // Limit to 5 items per page for pagination

  useEffect(() => {
    const fetchHolders = async () => {
      try {
        const res = await fetch(`/api/policy_holders?page=${page}&limit=${perPage}`);
        if (!res.ok) {
          throw new Error('Failed to fetch policy holders');
        }
        const data = await res.json();
        console.log("Fetched Data:", data);  // Log the API response to verify

        setHolders(data.policyHolders);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching policy holders:", error);
      }
    };

    fetchHolders();
  }, [page]);

  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-bold">Policy Holders</h1>
      <h5 className="font-light pb-8">Personal details of all policy holders</h5>
    
    
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Policy Holder ID</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Policies Held</th>
          </tr>
        </thead>
        <tbody>
          {holders.length > 0 ? (
            holders.map((holder) => (
              <tr key={holder.id}>
                <td className="border p-2 text-center">{holder.id}</td>
                <td className="border p-2 text-center">{holder.email}</td>
                <td className="border p-2 text-center">{holder.firstName}</td>
                <td className="border p-2 text-center">{holder.lastName}</td>
                <td className="border p-2">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {holder.policies.length > 0 ? (
                          holder.policies.map((policy, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="rounded-full px-3 py-1 text-xs font-semibold bg-slate-200">
                              {policy}
                            </Badge>
                            ))
                            ) : (
                                <span>—</span>
                            )}
                    </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <p>
          Showing {Math.min((page - 1) * perPage + 1, total)}-
          {Math.min(page * perPage, total)} of {total} policy holders
        </p>
        <div className="flex gap-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="text-blue-500 disabled:text-gray-300"
          >
            &lt; Prev
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page * perPage >= total}
            className="text-blue-500 disabled:text-gray-300"
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
