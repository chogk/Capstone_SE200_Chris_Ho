"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import PolicyHoldersContent from "./PolicyHoldersContent";

export default function PolicyHoldersPage() {
  const router = useRouter();

  return (
    <div className="p-4 sm:p-8 bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-2xl font-bold">Policy Holders</h1>
          <h5 className="text-gray-500 font-light">
            Personal details of all policy holders
          </h5>
        </div>

        {/* RIGHT SIDE */}

        {/* Add Policy Holder button manually inside page */}
        <Button
          onClick={() => router.push('/add_policy_holder')}
          className="w-full sm:w-auto bg-black text-white hover:bg-gray-900"
        >
          Add Policy Holder
        </Button>
      </div>

      {/* Policy Holders Table / Cards */}
      <PolicyHoldersContent />
    </div>
  );
}
