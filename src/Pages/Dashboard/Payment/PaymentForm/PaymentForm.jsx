import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const navigate = useNavigate();

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcelsId", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return "Loading.......";
  }

  const amount = parcelInfo.cost;

  const amountInCents = amount * 100;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("[paymentMethod]", paymentMethod);

      //   step-3 payment method
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        parcelId,
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(`Payment failed: ${result.error.message}`);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment succeeded!");
        }
      }
      const transactionId = result.paymentIntent.id;

      // 3) Send payment record to backend to save & update parcel
      const paymentRecord = {
        parcelId,
        amountInCents,
        transactionId,
        payerEmail: parcelInfo?.createdBy || null,
      };

      const res = await axiosSecure.post("/payments", paymentRecord);
      if (res.data.paymentId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Payment has been Successfully",
          text: `Transaction ID: ${res?.data?.paymentId}`,
          showConfirmButton: true,
		  confirmButtonText: "Go to my Parcels"
		}).then((res) => {
			if (res.isConfirmed) {
				navigate("/dashboard/myParcels")
			}
		});
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="w-11/12 md:w-7/12 lg:w-6/12 mx-auto my-5 p-5 rounded-2xl shadow-2xl bg-base-100 "
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: "antialiased",
                "::placeholder": {
                  color: "#aab7c4",
                },
                padding: "12px",
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
              },
              complete: {
                color: "#4BB543",
              },
            },
            hidePostalCode: true,
          }}
        />
        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          disabled={!stripe}
          className="btn bg-[#caeb66] w-full mt-5 text-center mx-auto flex"
        >
          Pay Now $ {amount}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
