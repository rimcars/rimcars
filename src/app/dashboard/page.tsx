<<<<<<< HEAD
import { redirect } from "next/navigation";

export default function Dashboard() {
  redirect("/dashboard/overview");
}
=======
import React from 'react';
import SellerDashboard from '@/features/dashboard/components/SellerDashboard';

const DashboardPage: React.FC = () => {
  return <SellerDashboard />;
};

export default DashboardPage; 
>>>>>>> ee1ef6661b18b7bf849401bf6198ad592b066852
