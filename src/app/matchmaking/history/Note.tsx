import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import { Button, Loading } from "@/components";
import { useUpdateMatchmaking } from "@/api/matchmaking";
import UserLink from "@/components/UserLink";

const Note = ({ matchToEdit = {}, setMatchToEdit }: any) => {
  const { mutateAsync: updateMatchmaking, ...resUpdateMatchmaking } =
    useUpdateMatchmaking();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const updating = false;

  useEffect(() => {
    textareaRef?.current?.focus();
  }, [textareaRef]);

  const handleSubmit = useCallback(
    async (e: any) => {
      try {
        e.preventDefault();
        await updateMatchmaking({
          id: matchToEdit.id,
          payload: { matchmaker_notes: e.target.matchmaker_notes.value },
        });

        await setMatchToEdit(null);
        toast.success("Note saved", { autoClose: 1000 });
      } catch (error) {}
    },
    [matchToEdit, setMatchToEdit, updateMatchmaking],
  );

  const loading = resUpdateMatchmaking.isPending;

  const { matchmaker_notes, UserOne, UserTwo } = matchToEdit || {};
  return (
    <form onSubmit={handleSubmit}>
      {loading && (
        <div className="absolute z-20 top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black/10">
          <Loading />
        </div>
      )}
      <div className="text-2xl text-purple-900 mr-7 mt-2">
        {matchmaker_notes ? "Edit" : "Add"} Notes Mesagge for{" "}
        <UserLink user={UserOne} /> & <UserLink user={UserTwo} />
      </div>
      <textarea
        ref={textareaRef}
        defaultValue={matchmaker_notes}
        name="matchmaker_notes"
        autoFocus
        id=""
        rows={7}
        className=" p-2 resize w-full md:w-full mt-5 border-[0.3px] border-red-500 focus:outline-none rounded-xl "
      />
      <div className="flex justify-end md:justify-center items-center gap-3 mt-3">
        <Button type="button" onClick={() => setMatchToEdit(null)}>
          Cancel
        </Button>
        <Button isLoading={updating} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default Note;
