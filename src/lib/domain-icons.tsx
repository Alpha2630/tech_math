import {
  Shield,
  Brain,
  BarChart3,
  Bot,
  Globe,
  Smartphone,
  Cloud,
  type LucideIcon,
} from "lucide-react";

export const domainIcons: Record<string, LucideIcon> = {
  shield: Shield,
  brain: Brain,
  "bar-chart": BarChart3,
  bot: Bot,
  globe: Globe,
  smartphone: Smartphone,
  cloud: Cloud,
};

export function getDomainIcon(key: string): LucideIcon {
  return domainIcons[key] ?? Globe;
}