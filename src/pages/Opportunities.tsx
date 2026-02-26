import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, DollarSign, Calendar, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOpportunities } from "@/lib/store";
import { CATEGORY_COLORS, type OpportunityCategory } from "@/lib/types";

const categoryGradients: Record<string, string> = {
  Tech: "from-[hsl(var(--purple))] to-[hsl(var(--blue))]",
  Design: "from-[hsl(var(--pink))] to-[hsl(var(--purple))]",
  Marketing: "from-[hsl(var(--teal))] to-[hsl(var(--blue))]",
  Finance: "from-[hsl(var(--amber))] to-[hsl(var(--pink))]",
  HR: "from-[hsl(var(--green))] to-[hsl(var(--teal))]",
  Other: "from-[hsl(var(--blue))] to-[hsl(var(--teal))]",
};

export default function Opportunities() {
  const [opportunities] = useOpportunities();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filtered = opportunities.filter((opp) => {
    const matchSearch = opp.company.toLowerCase().includes(search.toLowerCase()) || opp.role.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || opp.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black mb-2 gradient-text">
          Browse Opportunities
        </motion.h1>
        <p className="text-muted-foreground mb-8">Verified internship opportunities posted by admins</p>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by company or role..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-muted/50 border-white/10" />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40 bg-muted/50 border-white/10"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {(["Tech", "Design", "Marketing", "Finance", "HR", "Other"] as OpportunityCategory[]).map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((opp, i) => (
            <motion.div key={opp.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="glass gradient-border hover:scale-[1.02] transition-transform duration-200 h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryGradients[opp.category]} flex items-center justify-center text-white font-bold text-sm`}>
                        {opp.company.slice(0, 2)}
                      </div>
                      <div>
                        <CardTitle className="text-base">{opp.role}</CardTitle>
                        <p className="text-sm text-muted-foreground">{opp.company}</p>
                      </div>
                    </div>
                    <Badge className={`bg-gradient-to-r ${categoryGradients[opp.category]} text-white border-0 text-xs`}>{opp.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{opp.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {opp.location}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {opp.stipend}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {opp.deadline}</span>
                  </div>
                  <Button size="sm" className="w-full bg-gradient-to-r from-[hsl(var(--purple))] to-[hsl(var(--blue))] text-white border-0 mt-2">
                    <ExternalLink className="w-3 h-3 mr-1" /> Apply Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No opportunities match your search.</div>
        )}
      </div>
    </div>
  );
}
