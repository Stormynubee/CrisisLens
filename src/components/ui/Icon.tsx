import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  ClipboardCopy,
  CloudUpload,
  Eye,
  FileText,
  Flag,
  Heart,
  Landmark,
  Languages,
  Lightbulb,
  Lock,
  Shield,
  Touchpad,
  User,
  Zap,
} from 'lucide-react';
import clsx from 'clsx';

const iconMap: Record<string, LucideIcon> = {
  visibility: Eye,
  shield: Shield,
  language: Languages,
  bolt: Zap,
  article: FileText,
  favorite: Heart,
  account_balance: Landmark,
  emergency: Heart,
  cloud_upload: CloudUpload,
  arrow_back: ArrowLeft,
  arrow_forward: ArrowRight,
  touch_app: Touchpad,
  schedule: AlertTriangle,
  content_copy: ClipboardCopy,
  flag: Flag,
  translate: Languages,
  assignment_ind: User,
  warning: AlertTriangle,
  check: Check,
  description: FileText,
  person: User,
  building: Building2,
  chevron_right: ChevronRight,
  lightbulb: Lightbulb,
  lock: Lock,
};

interface IconProps {
  name: string;
  className?: string;
  'aria-hidden'?: boolean;
}

export function Icon({ name, className, 'aria-hidden': ariaHidden = true }: IconProps) {
  const Lucide = iconMap[name] ?? FileText;
  return <Lucide className={clsx('shrink-0', className)} aria-hidden={ariaHidden} />;
}
