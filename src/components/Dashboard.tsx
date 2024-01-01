"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { Ghost, Trash } from "lucide-react";
import { Skeleton } from "@nextui-org/react";
import { format } from "date-fns";

function Dashboard() {
  const { data: transcripts, isLoading } =
    trpc.getUserTranscriptions.useQuery();

  return (
    <main className="mx-auto md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-default-900">
          Meine Transkripte
        </h1>

        <Button>Open Upload-Modal</Button>
        {/* 
        todo: implement upload modal
        see https://nextui.org/docs/components/modal
         */}
      </div>

      {/* display all user files */}
      {transcripts && transcripts?.length !== 0 ? (
        <ul className="mt-8 divide-y divide-default-200">
          {transcripts
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <li
                key={file.id}
                className="divide-y divide-gray-200 rounded-lg bg-default-50 shadow transition hover:shadow-lg mb-4
                "
              >
                <Link
                  href={file.audioUrl!}
                  target="_blank"
                  className="flex flex-col gap-2"
                >
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-default-900">
                          {file.filename}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="px-6 mt-4 flex place-items-center py-2 gap-6 text-xs text-default-500 justify-between">
                  {format(new Date(file.createdAt), "MMM yyyy")}

                  <Button size="sm" color="danger" onClick={() => {}}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <div className="mt-8">
          <Skeleton className="my-2 h-28 rounded-md mb-4" />
          <Skeleton className="my-2 h-28 rounded-md mb-4" />
          <Skeleton className="my-2 h-28 rounded-md mb-4" />
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 text-default-800" />
          <h3 className="font-semibold text-xl">
            Es ist noch ziemlich leer hier
          </h3>
          <p>Lass uns dein erstes Video hochladen</p>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
