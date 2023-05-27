import clsx from "clsx";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface MobileItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) return onClick();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            onClick={handleClick}
            href={href}
            className={clsx(
              `
          group 
          flex 
          gap-x-3 
          text-sm 
          leading-6 
          font-semibold 
          w-full 
          justify-center 
          p-4 
          text-gray-500 
          hover:text-black 
          hover:bg-gray-100
        `,
              active && "bg-gray-100 text-black"
            )}
          >
            <Icon className="h-6 w-6" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-gray-600">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MobileItem;
