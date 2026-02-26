import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, BarChart3, Briefcase, Rocket, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingCards = [
  { icon: Briefcase, label: "42 Applications", sub: "This semester", color: "from-[hsl(var(--purple))] to-[hsl(var(--blue))]", delay: 0 },
  { icon: TrendingUp, label: "8 Interviews", sub: "In progress", color: "from-[hsl(var(--blue))] to-[hsl(var(--teal))]", delay: 0.2 },
  { icon: BarChart3, label: "3 Offers", sub: "Congratulations!", color: "from-[hsl(var(--teal))] to-[hsl(var(--green))]", delay: 0.4 },
];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Rocket className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Your internship journey starts here</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          Track Your{" "}
          <span className="gradient-text">Internship</span>
          <br />
          Journey
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Log applications, monitor status updates, and discover verified internship opportunities — all in one beautiful dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-[hsl(var(--purple))] to-[hsl(var(--blue))] hover:opacity-90 text-white border-0 text-base px-8 h-12">
            <Link to="/dashboard">I'm a Student</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="glass border-white/20 hover:bg-white/5 text-base px-8 h-12">
            <Link to="/admin">I'm an Admin</Link>
          </Button>
        </div>
      </motion.div>

      {/* Floating Cards */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full">
        {floatingCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + card.delay, duration: 0.6 }}
            className="animate-float"
            style={{ animationDelay: `${i * 1.5}s` }}
          >
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300 gradient-border">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xl font-bold text-foreground">{card.label}</p>
              <p className="text-sm text-muted-foreground">{card.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8"
      >
        <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce-slow" />
      </motion.div>
    </div>
  );
}
