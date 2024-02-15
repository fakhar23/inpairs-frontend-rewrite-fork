"use client";
import { ENDPOINTS, createCheckoutSession } from "@/api";
import paymentInfo from "@/assets/PaymentInfo.svg";
import { Card } from "@/components";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useMutation } from "@tanstack/react-query";

const Payment = () => {
  const user = useAuthContext();
  const paymentMutation = useMutation({
    mutationFn: async () => {
      const { checkoutSession } = await createCheckoutSession();
      window.location.href = checkoutSession;
    },
  });

  const handleCheckout = async () => {
    // Redirect to payment page
    paymentMutation.mutate();
  };
  const { isPayingUser } = user.data || {};
  return (
    <div className="relative">
      <div className="my-0 mx-auto flex flex-col gap-[5rem] items-center md:flex-col-reverse">
        <section className="flex flex-wrap gap-4 justify-center w-[100%] max-w-[400px] md:flex-col md:items-center md:justify-center">
          <Card
            className="w-[250px]"
            isCompleted={isPayingUser}
            loading={user.isLoading || paymentMutation.isPending}
            title="Fill Payment Information"
            icon={paymentInfo}
            onClick={handleCheckout}
            disabled={user.isLoading || isPayingUser}
          />
        </section>
      </div>
    </div>
  );
};

export default Payment;
