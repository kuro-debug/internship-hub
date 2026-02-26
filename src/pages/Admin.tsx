import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOpportunities } from "@/lib/store";
import type { Opportunity, OpportunityCategory } from "@/lib/types";

const categories: OpportunityCategory[] = ["Tech", "Design", "Marketing", "Finance", "HR", "Other"];

const emptyForm = { company: "", role: "", description: "", location: "", stipend: "", deadline: "", category: "Tech" as OpportunityCategory };

export default function Admin() {
  const [opportunities, setOpportunities] = useOpportunities();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const save = () => {
    if (!form.company || !form.role) return;
    if (editingId) {
      setOpportunities((prev) => prev.map((o) => (o.id === editingId ? { ...o, ...form } : o)));
      setEditingId(null);
    } else {
      const newOpp: Opportunity = { ...form, id: Date.now().toString(), postedAt: new Date().toISOString().slice(0, 10) };
      setOpportunities((prev) => [newOpp, ...prev]);
    }
    setForm(emptyForm);
    setShowForm(false);
  };

  const startEdit = (opp: Opportunity) => {
    setForm({ company: opp.company, role: opp.role, description: opp.description, location: opp.location, stipend: opp.stipend, deadline: opp.deadline, category: opp.category });
    setEditingId(opp.id);
    setShowForm(true);
  };

  const deleteOpp = (id: string) => setOpportunities((prev) => prev.filter((o) => o.id !== id));

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[hsl(var(--purple)/0.2)] to-[hsl(var(--blue)/0.2)] border border-white/10">
          <h1 className="text-3xl font-black gradient-text mb-1">Admin Panel</h1>
          <p className="text-muted-foreground">Post and manage verified internship opportunities</p>
        </motion.div>

        <Button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyForm); }} className="mb-6 bg-gradient-to-r from-[hsl(var(--purple))] to-[hsl(var(--blue))] border-0 text-white">
          <Plus className="w-4 h-4 mr-1" /> Post Opportunity
        </Button>

        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6 overflow-hidden">
            <Card className="glass gradient-border">
              <CardHeader><CardTitle className="text-base">{editingId ? "Edit" : "New"} Opportunity</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="bg-muted/50 border-white/10" />
                <Input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="bg-muted/50 border-white/10" />
                <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="bg-muted/50 border-white/10" />
                <Input placeholder="Stipend" value={form.stipend} onChange={(e) => setForm({ ...form, stipend: e.target.value })} className="bg-muted/50 border-white/10" />
                <Input type="date" placeholder="Deadline" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="bg-muted/50 border-white/10" />
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as OpportunityCategory })}>
                  <SelectTrigger className="bg-muted/50 border-white/10"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                <div className="md:col-span-2">
                  <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-muted/50 border-white/10" />
                </div>
                <div className="md:col-span-2 flex gap-2 justify-end">
                  <Button variant="ghost" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</Button>
                  <Button onClick={save} className="bg-gradient-to-r from-[hsl(var(--purple))] to-[hsl(var(--blue))] border-0 text-white">{editingId ? "Update" : "Post"}</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* List */}
        <div className="space-y-3">
          {opportunities.map((opp, i) => (
            <motion.div key={opp.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="glass border-white/5 hover:border-white/10 transition-colors">
                <CardContent className="p-5 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold truncate">{opp.company}</span>
                      <Badge variant="secondary" className="text-xs">{opp.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{opp.role} · {opp.location} · {opp.stipend}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(opp)}><Pencil className="w-3 h-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteOpp(opp.id)}><Trash2 className="w-3 h-3" /></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
