"use client";

import { Avatar } from "@nextui-org/react";

interface IProps {
  name: string;
  gitHubName: string;
}

function Author({ name, gitHubName }: IProps) {
  return (
    <Avatar
      className="h-5 w-5"
      name={name}
      src={`https://github.com/${gitHubName}.png?size=50`}
    />
  );
}

export default Author;
