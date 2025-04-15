"use client";

import { useEffect, useState } from "react";
import { PolicyTypeBadge } from '@/components/ui/PolicyTypeBadge';

export default function PoliciesContent({ userEmail }: { userEmail: string }) {
//export default function PoliciesTable() {
  const [policies, setPolicies] = useState<any[]>([]); // Initialize as an empty array
  const [totalPolicies, setTotalPolicies] = useState(0);
  const [page, setPage] = useState(1);
  const policiesPerPage = 5;

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch(`/api/policies?page=${page}&limit=${policiesPerPage}`);
        const data = await response.json();

        // Ensure policies data is an array before updating state
        if (Array.isArray(data.policies)) {
          setPolicies(data.policies);
          setTotalPolicies(data.total);
        } else {
          console.error("Policies data is undefined or not in expected format");
        }
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, [page]);

  return (
    <div className="p-8 bg-white">
      <div>
        <h1 className="text-2xl font-bold">Insurance Policies</h1>
        <h5 className="font-light pb-8">Critical details of insurance policies</h5>
        <table className="w-full border-collapse border p-8">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Base Price (SGD)</th>
              <th className="border p-2">Type of Policy</th>
            </tr>
          </thead>
          <tbody>
            {policies.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4">No policies available</td>
              </tr>
            ) : (
              policies.map((policy) => (
                <tr key={policy.id}>
                  <td className="border text-center p-2">{policy.id}</td>
                  <td className="border text-center p-2">{policy.name}</td>
                  <td className="border text-center p-2">
                    {new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(policy.base_price_sgd)}
                  </td>
                  <td className="border text-center p-2 font-bold px-3 py-1 text-xs">
                  <PolicyTypeBadge className="bg-slate-200   " types={policy.policy_Type ? [policy.policy_Type] : []} />
                  


                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <p>Showing {Math.min((page - 1) * policiesPerPage + 1, totalPolicies)}-{Math.min(page * policiesPerPage, totalPolicies)} of {totalPolicies} policies</p>
          <div className="flex gap-6">
            <button
              variant="ghost"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="text-blue-500 disabled:text-gray-300"
              asChild
            >
              <a>&lt; Prev</a>
            </button>
            <button
              variant="ghost"
              onClick={() => setPage(page + 1)}
              disabled={page * policiesPerPage >= totalPolicies}
              className="text-blue-500 disabled:text-gray-300"
              asChild
            >
              <a>Next &gt;</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
