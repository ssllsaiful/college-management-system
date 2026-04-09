"use client"
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Users,
  BookOpen,
  TrendingUp,
  Wallet,
  GraduationCap,
  ClipboardList
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";

const GROUP_COLORS: Record<string, string> = {
  Science: "#3b82f6",
  Commerce: "#f59e0b",
  Arts: "#8b5cf6",
};
const PIE_COLORS = ["#3b82f6", "#f59e0b", "#8b5cf6", "#10b981", "#f43f5e"];

interface DashboardStats {
  total_students: number;
  total_fees: number;
  group_distribution: { group: string; count: number }[];
  recent_students: {
    id: number;
    full_name: string;
    session: string;
    class_name: string;
    group: string;
    roll_number: string;
    admission_date: string;
  }[];
}

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  sub?: string;
  className?: string;
};

function StatCard({ title, value, icon, sub, className }: StatCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="h-5 w-5 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {sub && <p className="text-xs mt-1 text-gray-500">{sub}</p>}
      </CardContent>
    </Card>
  );
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard/")
      .then(res => res.json())
      .then(data => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const groupDist = stats?.group_distribution ?? [];
  const recentStudents = stats?.recent_students ?? [];
  const totalFees = stats?.total_fees ?? 0;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-gray-500 text-sm mt-0.5">South Point School & College — Admin Panel</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Students"
            value={loading ? "..." : (stats?.total_students ?? 0).toLocaleString()}
            icon={<Users className="h-5 w-5" />}
            sub="Across all sessions"
            className="bg-gradient-to-br from-blue-50 to-blue-100/40 border-blue-200"
          />
          <StatCard
            title="Total Fees Collected"
            value={loading ? "..." : `৳ ${Number(totalFees).toLocaleString()}`}
            icon={<Wallet className="h-5 w-5" />}
            sub="All payment records"
            className="bg-gradient-to-br from-emerald-50 to-emerald-100/40 border-emerald-200"
          />
          <StatCard
            title="Student Groups"
            value={loading ? "..." : groupDist.length}
            icon={<GraduationCap className="h-5 w-5" />}
            sub="Science, Commerce, Arts"
            className="bg-gradient-to-br from-purple-50 to-purple-100/40 border-purple-200"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Group Bar Chart */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart className="h-4 w-4 text-blue-600" />Student Group Distribution</CardTitle>
              <CardDescription>Number of students per group</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                {loading ? (
                  <div className="h-full flex items-center justify-center text-gray-400">Loading chart...</div>
                ) : groupDist.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400">No data yet.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={groupDist} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="group" />
                      <YAxis allowDecimals={false} />
                      <Tooltip formatter={(v: number) => [v, "Students"]} />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {groupDist.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={GROUP_COLORS[entry.group] ?? PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Group Pie Chart */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-purple-600" />Group Breakdown</CardTitle>
              <CardDescription>Percentage share by student group</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[240px]">
                {loading || groupDist.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    {loading ? "Loading..." : "No data yet."}
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={groupDist} dataKey="count" nameKey="group" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3}>
                        {groupDist.map((entry, index) => (
                          <Cell key={entry.group} fill={GROUP_COLORS[entry.group] ?? PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => [v, "Students"]} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="mt-2 space-y-1.5">
                {groupDist.map((item, index) => (
                  <div key={item.group} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: GROUP_COLORS[item.group] ?? PIE_COLORS[index] }} />
                      <span className="font-medium">{item.group}</span>
                    </div>
                    <span className="text-gray-500">{item.count} students</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Students */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ClipboardList className="h-4 w-4 text-gray-600" />Recently Admitted Students</CardTitle>
            <CardDescription>Last 5 students added to the system</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : recentStudents.length === 0 ? (
              <p className="text-gray-400 text-sm">No students yet. Add some from the Students List page!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-500">
                      <th className="pb-3 pr-4 font-medium">Roll</th>
                      <th className="pb-3 pr-4 font-medium">Name</th>
                      <th className="pb-3 pr-4 font-medium">Class</th>
                      <th className="pb-3 pr-4 font-medium">Group</th>
                      <th className="pb-3 font-medium">Session</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentStudents.map(s => (
                      <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 pr-4 font-mono font-medium">{s.roll_number}</td>
                        <td className="py-3 pr-4 font-medium text-gray-900">{s.full_name}</td>
                        <td className="py-3 pr-4 text-gray-600">{s.class_name}</td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            s.group === 'Science' ? 'bg-blue-100 text-blue-800' :
                            s.group === 'Commerce' ? 'bg-amber-100 text-amber-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>{s.group}</span>
                        </td>
                        <td className="py-3 text-gray-600">{s.session}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}