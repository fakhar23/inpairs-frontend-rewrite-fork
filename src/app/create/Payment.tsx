"use client";
import paymentInfo from "@/assets/PaymentInfo.svg";
import { Card } from "@/components";


const Payment = () => {
  const handleCheckout = () => {
    // Redirect to payment page
  };

  return (
    <div className="relative">
      <div className="my-0 mx-auto flex flex-col gap-[5rem] items-center md:flex-col-reverse">
        <section className="flex flex-wrap gap-4 justify-center w-[100%] max-w-[400px] md:flex-col md:items-center md:justify-center">
          <Card
            title="Fill Payment Information"
            icon={paymentInfo}
            onClick={() => handleCheckout()}
            isCompleted
          />
        </section>
      </div>
    </div>
  );
};

export default Payment;
