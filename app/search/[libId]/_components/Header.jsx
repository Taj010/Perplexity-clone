import { Clock } from "lucide-react";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Send , Link} from "lucide-react";

function Header({searchInputRecord}) {
  return (
    <div className="p-4 border-b flex justify-between items-center">
        <div className="flex gap-2 items-center">
            <UserButton/>
           <div className="flex gap-1 items-center">
            <Clock className="w-5 h-5 text-gray-500"/>
            <h2 className="text-sm text-gray-500">{ moment(searchInputRecord?.created_at).fromNow()}</h2>
           </div>
        </div>
    <h2 className="text-md text-gray-500 line-clamp-1 max-w-md">{searchInputRecord?.searchInput}</h2>
        <div className="flex gap-3">
          <Button><Link /></Button>
          <Button><Send/>Share</Button>
        </div>
    
    </div>
  );
}

export default Header;