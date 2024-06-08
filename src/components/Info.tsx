import React from "react";

type Props = {
  icon: React.ReactNode;
  text: string;
  value: any;
};
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Info: React.FC<Props> = ({ icon, text, value }:Props) => {
  return (
    <div className="flex items-center justify-normal gap-4 text-2xl py-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {icon}
            
          </TooltipTrigger>
          <TooltipContent>
            <p>{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <h2>{value}</h2>
    </div>
  );
};

export default Info;
