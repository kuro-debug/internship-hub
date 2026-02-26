export type ApplicationStatus = "applied" | "interview" | "offered" | "rejected";

export interface Application {
  id: string;
  company: string;
  role: string;
  dateApplied: string;
  link?: string;
  notes?: string;
  status: ApplicationStatus;
}

export type OpportunityCategory = "Tech" | "Design" | "Marketing" | "Finance" | "HR" | "Other";

export interface Opportunity {
  id: string;
  company: string;
  role: string;
  description: string;
  location: string;
  stipend: string;
  deadline: string;
  category: OpportunityCategory;
  postedAt: string;
}

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  applied: "blue",
  interview: "amber",
  offered: "green",
  rejected: "destructive",
};

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  applied: "Applied",
  interview: "Interview",
  offered: "Offered",
  rejected: "Rejected",
};

export const CATEGORY_COLORS: Record<OpportunityCategory, string> = {
  Tech: "purple",
  Design: "pink",
  Marketing: "teal",
  Finance: "amber",
  HR: "green",
  Other: "blue",
};
