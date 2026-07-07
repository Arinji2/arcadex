import "server-only";
import { Cashfree, CFEnvironment } from "cashfree-pg";

export const CashfreeServer = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.CASHFREE_CLIENT_ID,
  process.env.CASHFREE_SECRET_KEY,
);
