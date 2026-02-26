import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LayoutGrid, List, Briefcase, MessageSquare, Trophy, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useApplications } from "@/lib/store";
import type { Application, ApplicationStatus } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/types";

const statusConfig: Record<ApplicationStatus, { bg: string; text: string; icon: typeof Briefcase }> = {
  applied: { bg: "bg-secondary/20", text: "text-secondary", icon: Briefcase },
  interview: { bg: "bg-amber/20", text: "text-amber", icon: MessageSquare },
  offered: { bg: "bg-green/20", text: "text-green", icon: Trophy },
  rejected: { bg: "bg-destructive/20", text: "text-destructive", icon: X },
};

const chartColors = ["hsl(217,91%,60%)", "hsl(38,92%,50%)", "hsl(142,71%,45%)", "hsl(0,84%,60%)"];

export default function Dashboard() {
  const [applications, setApplications] = useApplications();
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [form, setForm] = useState({ company: "", role: "", dateApplied: "", link: "", notes: "", status: "applied" as ApplicationStatus });

  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "applied").length,
    interview: applications.filter((a) => a.status === "interview").length,
    offered: applications.filter((a) => a.status === "offered").length,
  };

  const pieData = [
    { name: "Applied", value: stats.applied },
    { name: "Interview", value: stats.interview },
    { name: "Offered", value: stats.offered },
    { name: "Rejected", value: applications.filter((a) => a.status === "rejected").length },
  ].filter((d) => d.value > 0);

  // Group by month for line chart
  const monthlyData = applications.reduce((acc, app) => {
    const month = app.dateApplied.slice(0, 7);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const lineData = Object.entries(monthlyData).sort().map(([month, count]) => ({ month, count }));

  const addApplication = () => {
    if (!form.company || !form.role) return;
    const newApp: Application = { ...form, id: Date.now().toString(), dateApplied: form.dateApplied || new Date().toISOString().slice(0, 10) };
    setApplications((prev) => [newApp, ...prev]);
    setForm({ company: "", role: "", dateApplied: "", link: "", notes: "", status: "applied" });
    setShowForm(false);
  };

  const updateStatus = (id: string, status: ApplicationStatus) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const deleteApp = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const statCards = [
    { label: "Total", value: stats.total, icon: Briefcase, gradient: "from-[hsl(var(--purple))] to-[hsl(var(--blue))]" },
    { label: "Interviews", value: stats.interview, icon: MessageSquare, gradient: "from-[hsl(var(--amber))] to-[hsl(var(--pink))]" },
    { label: "Offers", value: stats.offered, icon: Trophy, gradient: "from-[hsl(var(--teal))] to-[hsl(var(--green))]" },
    { label: "Pending", value: stats.applied, icon: Clock, gradient: "from-[hsl(var(--blue))] to-[hsl(var(--teal))]" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black mb-8 gradient-text">
          Student Dashboard
        </motion.h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass gradient-border hover:scale-105 transition-transform duration-300 overflow-hidden">
                <CardContent className="p-5">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-3`}>
                    <s.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-3xl font-black text-foreground">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="glass border border-white/10">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <div className="flex items-center justify-between">
              <Button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-[hsl(var(--purple))] to-[hsl(var(--blue))] border-0 text-white">
                <Plus className="w-4 h-4 mr-1" /> Add Application
              </Button>
              <div className="flex gap-1">
                <Button variant={viewMode === "cards" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("cards")}><LayoutGrid className="w-4 h-4" /></Button>
                <Button variant={viewMode === "table" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("table")}><List className="w-4 h-4" /></Button>
              </div>
            </div>

            {/* Add Form */}
            <AnimatePresence>
              {showForm && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <Card className="glass gradient-border">
                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="bg-muted/50 border-white/10" />
                      <Input placeholder="Role / Position" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="bg-muted/50 border-white/10" />
                      <Input type="date" value={form.dateApplied} onChange={(e) => setForm({ ...form, dateApplied: e.target.value })} className="bg-muted/50 border-white/10" />
                      <Input placeholder="Application Link (optional)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="bg-muted/50 border-white/10" />
                      <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as ApplicationStatus })}>
                        <SelectTrigger className="bg-muted/50 border-white/10"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {(Object.keys(STATUS_LABELS) as ApplicationStatus[]).map((s) => (
                            <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="bg-muted/50 border-white/10" />
                      <div className="md:col-span-2 flex gap-2 justify-end">
                        <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                        <Button onClick={addApplication} className="bg-gradient-to-r from-[hsl(var(--purple))] to-[hsl(var(--blue))] border-0 text-white">Save</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cards View */}
            {viewMode === "cards" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {applications.map((app, i) => {
                  const sc = statusConfig[app.status];
                  return (
                    <motion.div key={app.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <Card className="glass gradient-border hover:scale-[1.02] transition-transform duration-200">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base">{app.company}</CardTitle>
                              <p className="text-sm text-muted-foreground">{app.role}</p>
                            </div>
                            <Badge className={`${sc.bg} ${sc.text} border-0`}>{STATUS_LABELS[app.status]}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-xs text-muted-foreground">Applied: {app.dateApplied}</p>
                          {app.notes && <p className="text-xs text-muted-foreground">{app.notes}</p>}
                          <div className="flex items-center gap-2">
                            <Select value={app.status} onValueChange={(v) => updateStatus(app.id, v as ApplicationStatus)}>
                              <SelectTrigger className="h-8 text-xs bg-muted/50 border-white/10 flex-1"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {(Object.keys(STATUS_LABELS) as ApplicationStatus[]).map((s) => (
                                  <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteApp(app.id)}><X className="w-3 h-3" /></Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <Card className="glass gradient-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 text-muted-foreground font-medium">Company</th>
                        <th className="text-left p-4 text-muted-foreground font-medium">Role</th>
                        <th className="text-left p-4 text-muted-foreground font-medium">Date</th>
                        <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
                        <th className="text-left p-4 text-muted-foreground font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => {
                        const sc = statusConfig[app.status];
                        return (
                          <tr key={app.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 font-medium">{app.company}</td>
                            <td className="p-4 text-muted-foreground">{app.role}</td>
                            <td className="p-4 text-muted-foreground">{app.dateApplied}</td>
                            <td className="p-4"><Badge className={`${sc.bg} ${sc.text} border-0`}>{STATUS_LABELS[app.status]}</Badge></td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Select value={app.status} onValueChange={(v) => updateStatus(app.id, v as ApplicationStatus)}>
                                  <SelectTrigger className="h-7 text-xs bg-muted/50 border-white/10 w-28"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    {(Object.keys(STATUS_LABELS) as ApplicationStatus[]).map((s) => (
                                      <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteApp(app.id)}><X className="w-3 h-3" /></Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass gradient-border">
                <CardHeader><CardTitle className="text-base">Status Breakdown</CardTitle></CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                        {pieData.map((_, i) => (
                          <Cell key={i} fill={chartColors[i % chartColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: "hsl(230,25%,11%)", border: "1px solid hsl(230,20%,18%)", borderRadius: "8px", color: "#fff" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="glass gradient-border">
                <CardHeader><CardTitle className="text-base">Applications Over Time</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={lineData}>
                      <XAxis dataKey="month" stroke="hsl(215,20%,55%)" fontSize={12} />
                      <YAxis stroke="hsl(215,20%,55%)" fontSize={12} />
                      <Tooltip contentStyle={{ background: "hsl(230,25%,11%)", border: "1px solid hsl(230,20%,18%)", borderRadius: "8px", color: "#fff" }} />
                      <Line type="monotone" dataKey="count" stroke="hsl(258,90%,66%)" strokeWidth={2} dot={{ fill: "hsl(258,90%,66%)" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
