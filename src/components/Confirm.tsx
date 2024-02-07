import React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

const ModalConfirm = ({
  open = false,
  title = 'Are you absolutely sure?',
  desc = 'Please check carefully because this action cannot be undone.',
  onConfirm = null,
  onClose = null,
  isLoading = false
}: any) => {
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          onClick={onClose}
          className="bg-gray-900 opacity-50 data-[state=open]:animate-overlayShow fixed inset-0"
        />
        <AlertDialog.Content
          onEscapeKeyDown={onClose}
          className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
          <AlertDialog.Title className="text-center m-0 text-[17px] font-medium">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            {desc}
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <button
              onClick={onClose}
              className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={!!isLoading}
              className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
            >
              Confirm
            </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default ModalConfirm
