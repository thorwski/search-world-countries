// components/Badge.tsx
interface BadgeProps {
  label: string;
}

const Badge = ({ label }: BadgeProps) => {
  return (
    <span className="truncate font-light text-sm px-5 py-1 bg-light-bg dark:bg-dark2-bg rounded-md shadow-sm text-center">
      {label}
    </span>
  );
};

export default Badge;
