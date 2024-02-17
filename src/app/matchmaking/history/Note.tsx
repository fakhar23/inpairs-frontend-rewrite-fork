import { useEffect, useRef } from "react";
import { Button } from "@/components";
import UserLink from "@/components/UserLink";

const Note = ({ matchToEdit = {}, setMatchToEdit }: any) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const updating = false;

  useEffect(() => {
    textareaRef?.current?.focus();
  }, [textareaRef]);

  const handleSubmit = () => {};

  const { note, user_one, user_two } = matchToEdit || {};
  return (
    <form onSubmit={handleSubmit}>
      <div className="text-2xl text-secondary-600 mr-7 mt-2">
        {note ? "Edit" : "Add"} Notes Mesagge for <UserLink user={user_one} /> &{" "}
        <UserLink user={user_two} />
      </div>
      <textarea
        ref={textareaRef}
        defaultValue={note}
        name="note"
        autoFocus
        id=""
        rows={7}
        className=" p-2 resize w-[50vw] md:w-full mt-5 border-[0.3px] border-primary focus:outline-none rounded-xl "
      />
      <div className="flex justify-end items-center gap-3 mt-3">
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
