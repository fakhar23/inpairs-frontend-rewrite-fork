import React from 'react';
import ExpandableText from '@/components/ExpandableText';
import { useGetMatchTracking } from '@/api/matchmaking';
import { Loading } from '@/components';

export default function RejectionReasonsModal() {
  const { data: matchTracking, ...resGetmatchTracking } = useGetMatchTracking({
    queryParams: { select: 'rejectionReasons' },
  });

  const loading = resGetmatchTracking.isLoading;

  return (
    <div className="mt-5  w-[80vw] min-h-[70vh] max-h-[80vh] overflow-auto">
      {loading && (
        <div className="absolute z-20 top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black/10">
          <Loading />
        </div>
      )}
      {!loading ? (
        matchTracking?.rejectionReasons?.length ? (
          matchTracking?.rejectionReasons.map((reason: string, i: number) => (
            <p
              key={i}
              className="text-start border-b mb-2 px-6 py-4 whitespace-pre-line"
            >
              <ExpandableText text={reason} maxChar={140} />
            </p>
          ))
        ) : (
          <p className="text-gray-600 text-center">Empty</p>
        )
      ) : null}
    </div>
  );
}
