import { useEffect, useRef } from "react";

import UserLink from "./UserLink";
import { ClickButton } from "@/components";

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
      <div className="text-2xl text-purple-900 mr-7 mt-2">
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
        className=" p-2 resize w-[50vw] md:w-full mt-5 border-[0.3px] border-red-500 focus:outline-none rounded-xl "
      />
      <div className="flex justify-end items-center gap-3 mt-3">
        <ClickButton
          type="button"
          click={() => setMatchToEdit(null)}
          content="Cancel"
        />
        <ClickButton isLoading={updating} type="submit" content="Save" />
      </div>
    </form>
  );
};

export default Note;
