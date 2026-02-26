import { useState, useEffect } from "react";
import type { Application, Opportunity } from "./types";

const MOCK_APPLICATIONS: Application[] = [
  { id: "1", company: "Google", role: "SWE Intern", dateApplied: "2026-01-15", status: "interview", link: "https://careers.google.com", notes: "Referral from John" },
  { id: "2", company: "Meta", role: "Product Design Intern", dateApplied: "2026-01-20", status: "applied", notes: "Applied via website" },
  { id: "3", company: "Stripe", role: "Backend Intern", dateApplied: "2026-02-01", status: "offered", link: "https://stripe.com/jobs" },
  { id: "4", company: "Amazon", role: "SDE Intern", dateApplied: "2025-12-10", status: "rejected" },
  { id: "5", company: "Notion", role: "Frontend Intern", dateApplied: "2026-02-10", status: "applied", notes: "Portfolio submitted" },
  { id: "6", company: "Figma", role: "Design Engineer Intern", dateApplied: "2026-02-15", status: "interview" },
];

const MOCK_OPPORTUNITIES: Opportunity[] = [
  { id: "1", company: "Microsoft", role: "Software Engineering Intern", description: "Join the Azure team to build cloud infrastructure tools.", location: "Redmond, WA", stipend: "$8,000/mo", deadline: "2026-03-31", category: "Tech", postedAt: "2026-02-01" },
  { id: "2", company: "Airbnb", role: "Product Design Intern", description: "Redesign the host experience for mobile platforms.", location: "San Francisco, CA", stipend: "$7,500/mo", deadline: "2026-04-15", category: "Design", postedAt: "2026-02-05" },
  { id: "3", company: "HubSpot", role: "Marketing Intern", description: "Drive growth campaigns for SMB segment.", location: "Remote", stipend: "$5,000/mo", deadline: "2026-03-20", category: "Marketing", postedAt: "2026-02-10" },
  { id: "4", company: "Goldman Sachs", role: "Summer Analyst", description: "Rotation across investment banking and asset management.", location: "New York, NY", stipend: "$10,000/mo", deadline: "2026-04-01", category: "Finance", postedAt: "2026-02-12" },
  { id: "5", company: "Spotify", role: "Data Science Intern", description: "Build recommendation models for podcast discovery.", location: "Stockholm, SE", stipend: "€6,000/mo", deadline: "2026-05-01", category: "Tech", postedAt: "2026-02-20" },
];

function useLocalStorage<T>(key: string, initial: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function useApplications() {
  return useLocalStorage<Application[]>("interntrack-apps", MOCK_APPLICATIONS);
}

export function useOpportunities() {
  return useLocalStorage<Opportunity[]>("interntrack-opps", MOCK_OPPORTUNITIES);
}
