"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateTourForm from "@/components/modules/guide/CreateTourForm";

const CreateTourPage = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      
    

      {/* 2. Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        
        {/* Page Title & Context */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create a New Tour
          </h1>
          <p className="mt-2 text-gray-500 text-lg">
            Fill in the details below to publish a new adventure. 
            Ensure your pricing and schedule are accurate before publishing.
          </p>
        </div>

        {/* 3. The Form Component */}
        {/* We wrap it in a div if we need specific spacing, but usually the form handles itself */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CreateTourForm />
        </div>

      </main>
    </div>
  );
};

export default CreateTourPage;