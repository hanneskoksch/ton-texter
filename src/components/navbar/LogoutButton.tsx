"use client";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { LogOut } from "lucide-react";
import { useState } from "react";

function LogoutButton({ signOut }: { signOut: (formData: FormData) => void }) {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  return (
    <Popover
      placement="bottom-end"
      backdrop="blur"
      isOpen={popoverIsOpen}
      onOpenChange={(open) => setPopoverIsOpen(open)}
    >
      <PopoverTrigger>
        <Button isIconOnly color="danger" size="sm" variant="flat">
          <LogOut className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4">
        <p className="mb-3">Willst du dich wirklich ausloggen?</p>
        <div className="flex space-x-3">
          <Button
            color="default"
            size="sm"
            variant="flat"
            onClick={() => setPopoverIsOpen(false)}
          >
            Abbrechen
          </Button>
          <form action={signOut}>
            <Button type="submit" color="danger" size="sm">
              Logout
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default LogoutButton;
