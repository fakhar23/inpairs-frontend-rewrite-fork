import { Button, Input } from "@/components";
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

            <div key={index} className="flex items-center gap-2 mb-1">
              <Input
                id={`phone-number-${index}`}
                name={`phone-number-${index}`}
                className={`flex-1 px-3  w-full rounded-md  ${
                  number && number == error ? "border-red-500 shake" : ""
                }`}
                value={number}
                onChange={handleInputChange(index)}
                placeholder="Enter phone number"
                variation="secondary"
              />

              <Button
                className="my-2 p-2 rounded "
                onClick={() => deleteBlockedNumber(index)}
                aria-label="Delete"
              >
                &times;
              </Button>
            </div>
          </>
        ))}

        {error && (
          <p className="text-red-500 mt-[-1px] mb-1.5 ">
            No user found against : {error}
          </p>
        )}

        <Button
          onClick={addNewBlockedNumber}
          variant="outlined"
          className="flex gap-2 items-center mx-auto"
        >
          <IoAddOutline /> <p>Add more</p>
        </Button>
      </div>

      <div className="flex items-center justify-between gap-2 ">
        <Button
          onClick={handleSaveChanges}
          isDisabled={isSaveDisabled}
          isLoading={isLoading}
        >
          Save changes
        </Button>
        <Button
          type="button"
          onClick={() => setIsBlockingModal(false)}
          variant="outlined"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BlockingPhoneNoModal;
