// Foundational Components
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';
export { Loading } from './Loading';
export { ErrorMessage } from './ErrorMessage';

// Navigation Components
export { GlobalHeader } from './GlobalHeader';
export { Sidebar } from './Sidebar';
export { Breadcrumbs } from './Breadcrumbs';

// Data Display Components
export { Badge, DifficultyBadge } from './Badge';
export type { BadgeVariant, BadgeColor, BadgeSize } from './Badge';

export { ProgressBar } from './ProgressBar';
export type { ProgressBarType, ProgressBarColor } from './ProgressBar';

export { Tooltip } from './Tooltip';
export type { TooltipPosition, TooltipTrigger } from './Tooltip';

export { Tabs } from './Tabs';
export type { TabsVariant } from './Tabs';

export { Accordion } from './Accordion';

export { CodeBlock } from './CodeBlock';
export type { CodeLanguage } from './CodeBlock';

// Interactive Components
export { Modal } from './Modal';
export type { ModalSize } from './Modal';

export { ToastProvider, useToast } from './Toast';
export type { ToastType, ToastPosition } from './Toast';

export { Search } from './Search';

// List & Table Components
export { QuestionCard } from './QuestionCard';
export { TopicCard } from './TopicCard';

export { Filter } from './Filter';
export type { FilterOption, FilterGroup, SortOption } from './Filter';

export { Pagination } from './Pagination';

// Specialized Components
export { CodeEditor } from './CodeEditor';
export { Layout } from './Layout';

// Enhanced Components (New - Non-Breaking Addition)
export {
  EnhancedCard,
  ModuleCard,
  StatCard,
  QuickActionCard,
  ProgressCard,
  AchievementCard,
} from './EnhancedCard';

export {
  EnhancedButton,
  PrimaryButton,
  SecondaryButton,
  GhostButton,
  SuccessButton,
  WarningButton,
  DangerButton,
  IconButton,
  FloatingActionButton,
  ButtonGroup,
} from './EnhancedButton';
export type { ButtonVariant, ButtonSize, IconPosition } from './EnhancedButton';
