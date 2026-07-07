"use server";
import axios from "axios";
import { CashfreeServer } from "@/lib/cashfree-server";
import { getUID } from "@/lib/session";
import type { Registration } from "@/lib/types";

export async function PayAction({
  registrationData,
}: {
  registrationData: Registration;
}) {
  try {
    const totalGames = registrationData.games.length;
    const totalAmount = totalGames >= 4 ? totalGames * 50 : totalGames * 60;
    const { uid, createdCookie } = await getUID();

    if (createdCookie) {
      return {
        success: false,
        payment_session_id: "",
        order_id: "",
      };
    }

    const request = {
      order_amount: 1,
      order_currency: "INR",
      customer_details: {
        customer_id: uid,
        customer_name: registrationData.name,
        customer_email: registrationData.email,
        customer_phone: registrationData.mobile_num,
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_URL}/register/success?order_id={order_id}`,
      },
      order_note: "",
    };

    const { data } = await CashfreeServer.PGCreateOrder(request);
    return {
      success: true,
      order_id: data.order_id,
      payment_session_id: data.payment_session_id as string,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      console.dir(error.response?.data, { depth: null });
    } else {
      console.error(error);
    }
    return {
      success: false,
      payment_session_id: "",
      order_id: "",
    };
  }
}
