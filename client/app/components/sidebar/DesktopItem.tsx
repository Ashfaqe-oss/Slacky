import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
  onClick,
}) => {

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild >
          <li onClick={handleClick} key={label} className="rounded-md">
            <Link
              href={href}
              className={clsx(
                `
            group 
            flex 
            gap-x-3 
            rounded-xl
            p-3 
            text-sm 
            leading-6 
            font-semibold 
            text-gray-500 
            hover:text-black 
            hover:bg-gray-100
            m-2
          `,
                active && "bg-gray-100 text-black"
              )}
            >
              <Icon className="h-7 w-7 shrink-0" aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </Link>
          </li>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p className="text-gray-600">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DesktopItem;
