import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Users,
  FileText,
  Settings,
  LogOut,
  Building2,
  GraduationCap,
  Briefcase,
  BookOpenCheck,
} from "lucide-react";

export default function Sidebar() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Building2 },
    ...(user?.role === "recruiter" || user?.role === "admin"
      ? [
          { name: "Candidates", href: "/dashboard/candidates", icon: Users },
          { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
          { name: "Students", href: "/dashboard/students", icon: Users },
          {
            name: "Placements",
            href: "/dashboard/placements",
            icon: Briefcase,
          },
        ]
      : []),
    ...(user?.role === "candidate"
      ? [
          {
            name: "My Profile",
            href: "/dashboard/profile",
            icon: GraduationCap,
          },
          {
            name: "My Applications",
            href: "/dashboard/applications",
            icon: FileText,
          },
          {
            name: "My Resume",
            href: "/dashboard/resume",
            icon: FileText,
          },
          {
            name: "My Tests",
            href: "/dashboard/test",
            icon: BookOpenCheck,
          },
        ]
      : []),
    ...(user?.role === "placement_officer"
      ? [
          { name: "Students", href: "/dashboard/students", icon: Users },
          {
            name: "Placements",
            href: "/dashboard/placements",
            icon: Briefcase,
          },
        ]
      : []),
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                location.pathname === item.href
                  ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
        <button
          onClick={() => signOut()}
          className="w-full text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </button>
      </nav>
      <div className="flex items-center px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {user?.full_name?.[0]?.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user?.full_name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {user?.role}
          </p>
        </div>
      </div>
    </div>
  );
}
