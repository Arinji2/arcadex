declare module "@cashfreepayments/cashfree-js" {
  export interface CheckoutResult {
    error?: unknown;
    redirect?: boolean;
    paymentDetails?: {
      paymentMessage?: string;
    };
  }

  export interface Cashfree {
    checkout(options: {
      paymentSessionId: string;
      redirectTarget?: "_self" | "_blank" | "_top" | "_modal" | HTMLElement;
      appearance?: {
        width?: string;
        height?: string;
      };
    }): Promise<CheckoutResult>;
  }

  export function load(options: {
    mode: "sandbox" | "production";
  }): Promise<Cashfree>;
}
