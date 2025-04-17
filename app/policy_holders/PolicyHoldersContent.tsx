"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface PolicyHolder {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  policies: string[];
}

export default function PolicyHoldersContent() {
  const [holders, setHolders] = useState<PolicyHolder[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const holdersPerPage = 5;

  useEffect(() => {
    const fetchHolders = async () => {
      try {
        const res = await fetch(`/api/policy_holders?page=${page}&limit=${holdersPerPage}`);
        const data = await res.json();
        setHolders(data.policyHolders);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching policy holders:", error);
      }
    };

    fetchHolders();
  }, [page]);

  return (
    <div>
      {/* Desktop View: Table */}
      <div className="hidden sm:block">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Policies</th>
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
                  <td className="border p-2 text-center">
                    {holder.policies.length > 0 ? (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {holder.policies.map((policy, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="rounded-full px-3 py-1 text-xs font-semibold bg-slate-200"
                          >
                            {policy}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No policy holders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Cards */}
      <div className="flex flex-col gap-2 sm:hidden">
        {holders.length > 0 ? (
          holders.map((holder) => (
            <div
              key={holder.id}
              className="bg-gray-100 rounded p-4 shadow-sm space-y-2"
            >
              <div>
                <span className="font-semibold">ID:</span> {holder.id}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {holder.email}
              </div>
              <div>
                <span className="font-semibold">First Name:</span> {holder.firstName}
              </div>
              <div>
                <span className="font-semibold">Last Name:</span> {holder.lastName}
              </div>
              <div>
                <span className="font-semibold">Policies:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {holder.policies.length > 0 ? (
                    holder.policies.map((policy, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="rounded-full px-3 py-1 text-xs font-semibold bg-slate-200"
                      >
                        {policy}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 bg-gray-100 rounded shadow">
            No policy holders found
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <p>
          Showing {Math.min((page - 1) * holdersPerPage + 1, total)}-
          {Math.min(page * holdersPerPage, total)} of {total} holders
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
            disabled={page * holdersPerPage >= total}
            className="text-blue-500 disabled:text-gray-300"
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

