import React from "react";
import ExpandableText from "@/components/ExpandableText";
import { rejectionReasons } from "./rejectionData";

export default function RejectionReasonsModal() {
  const data = {
    rejectionReasons,
  };

  //   TODO: add loading state
  //   if (isFetching && !data?.rejectionReasons?.length) {
  //     return <Loading />;
  //   }

  return (
    <div className="mt-5  w-[80vw] min-h-[70vh] max-h-[80vh] overflow-auto">
      {!!data?.rejectionReasons?.length ? (
        data?.rejectionReasons.map((reason: string, i: number) => (
          <p
            key={i}
            className="text-start border-b mb-2 px-6 py-4 whitespace-pre-line"
          >
            <ExpandableText text={reason} maxChar={140} />
          </p>
        ))
      ) : (
        <p className="text-darkGrayText text-center">Empty</p>
      )}
    </div>
  );
}
