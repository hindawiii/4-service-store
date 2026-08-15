import {
  Backpack, BookOpen, Bot, Code2, Cpu, FileText, GraduationCap, HardDriveDownload,
  Headset, KeyRound, Laptop, MessagesSquare, MonitorCog, Package, Palette, Rocket,
  ShieldCheck, Sparkles, Terminal, Wrench, type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Backpack, BookOpen, Bot, Code2, Cpu, FileText, GraduationCap, HardDriveDownload,
  Headset, KeyRound, Laptop, MessagesSquare, MonitorCog, Package, Palette, Rocket,
  ShieldCheck, Sparkles, Terminal, Wrench,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = MAP[name] ?? Sparkles;
  return <Icon className={className} strokeWidth={1.5} />;
}