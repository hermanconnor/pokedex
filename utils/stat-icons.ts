import { Activity, LucideIcon, Shield, Sword, Zap } from "lucide-react";

const statIcons: Record<string, LucideIcon> = {
  hp: Activity,
  attack: Sword,
  defense: Shield,
  "special-attack": Zap,
  "special-defense": Shield,
  speed: Zap,
};

export default statIcons;
