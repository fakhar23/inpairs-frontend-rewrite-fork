import { Button } from "@/components";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";

interface BlockingPhoneNoModalProps {
  setIsBlockingModal: (value: boolean) => void;
}

const BlockingPhoneNoModal: React.FC<BlockingPhoneNoModalProps> = ({
  setIsBlockingModal,
}) => {
  const [blockedNumbers, setBlockedNumbers] = useState([""]);
  const [error, setError] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newBlockedNumbers = [...blockedNumbers];
      newBlockedNumbers[index] = event.target.value;
      setBlockedNumbers(newBlockedNumbers);
    };

  const addNewBlockedNumber = () => setBlockedNumbers([...blockedNumbers, ""]);

  const deleteBlockedNumber = (index: number) => {
    const newBlockedNumbers = [...blockedNumbers];
    newBlockedNumbers.splice(index, 1);
    setBlockedNumbers(newBlockedNumbers);
  };

  const handleSaveChanges = async () => undefined;

  return (
    <div className="p-6 w-full max-w-md max-h-[80vh] overflow-auto ">
      <h2 className="text-2xl font-bold text-gray-800">
        Blocked Phone Numbers
      </h2>

      <div className="my-5">
        {blockedNumbers.map((number, index) => (
          <>
            <p className="text-gray-700">{`Phone Number #${index + 1}`}</p>

            <div key={index} className="flex items-stretch gap-2 mb-3">
              <input
                type="text"
                value={number}
                onChange={handleInputChange(index)}
                className={`outline-none flex-1 px-3 py-2 mt-1 w-full rounded-md border-gray-500 border focus:ring-red-600 ${
                  number && number == error ? "border-red-500 shake" : ""
                }`}
                placeholder="Enter phone number"
              />

              <button
                onClick={() => deleteBlockedNumber(index)}
                className="my-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                aria-label="Delete"
              >
                &times;
              </button>
            </div>
          </>
        ))}

        {error && (
          <p className="text-red mt-[-1px] mb-1.5 ">
            No user found against : {error}
          </p>
        )}

        <button
          onClick={addNewBlockedNumber}
          className="flex  gap-2 items-center w-fit mx-auto border-red-500 border-2 px-[1rem] py-[0.3rem] rounded-3xl text-[1rem] shadow-xl  disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <IoAddOutline /> <p>Add more</p>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <Button
          content="Save changes"
          onClick={handleSaveChanges}
          disable={isSaveDisabled}
          loading={isLoading}
        />

        <button
          className="bg-while text-black px-[4rem] py-[0.3rem] md:px-[10rem] md:py-[1rem] md:text-regular rounded-3xl text-[1.2rem] shadow-xl border border-black disabled:cursor-not-allowed disabled:bg-slate-300"
          type="button"
          onClick={() => setIsBlockingModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BlockingPhoneNoModal;