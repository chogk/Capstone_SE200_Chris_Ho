"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PolicyTypeBadge } from "@/components/ui/PolicyTypeBadge";

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [totalPolicies, setTotalPolicies] = useState(0);
  const [page, setPage] = useState(1);
  const policiesPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch(`/api/policies?page=${page}&limit=${policiesPerPage}`);
        const data = await response.json();

        if (Array.isArray(data.policies)) {
          setPolicies(data.policies);
          setTotalPolicies(data.total);
        } else {
          console.error("Policies data is not in expected format");
        }
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, [page]);

  return (
    <div className="p-4 sm:p-8 bg-white">
      {/* Title + Add Policy Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-2xl font-bold">Insurance Policies</h1>
          <h5 className="text-gray-500 font-light">
            Critical details of insurance policies
          </h5>
        </div>

        {/* RIGHT SIDE */}
        <Button
          onClick={() => router.push('/add_policy')}
          className="w-full sm:w-auto bg-black text-white hover:bg-gray-900"
        >
          Add Policy
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block">
        <table className="w-full border-collapse border">
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
                  <td className="border text-center p-2">
                    <PolicyTypeBadge className="bg-slate-200" types={policy.policy_Type ? [policy.policy_Type] : []} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="flex flex-col gap-2 sm:hidden">
        {policies.length === 0 ? (
          <div className="text-center p-4 bg-gray-100 rounded shadow">
            No policies available
          </div>
        ) : (
          policies.map((policy) => (
            <div
              key={policy.id}
              className="bg-gray-100 rounded p-4 shadow-sm space-y-2"
            >
              <div>
                <span className="font-semibold">Policy ID:</span> {policy.id}
              </div>
              <div>
                <span className="font-semibold">Name:</span> {policy.name}
              </div>
              <div>
                <span className="font-semibold">Base Price (SGD):</span> {new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(policy.base_price_sgd)}
              </div>
              <div>
                <span className="font-semibold">Type:</span>{" "}
                <PolicyTypeBadge className="bg-slate-200" types={policy.policy_Type ? [policy.policy_Type] : []} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <p>Showing {Math.min((page - 1) * policiesPerPage + 1, totalPolicies)}-{Math.min(page * policiesPerPage, totalPolicies)} of {totalPolicies} policies</p>
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
            disabled={page * policiesPerPage >= totalPolicies}
            className="text-blue-500 disabled:text-gray-300"
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
