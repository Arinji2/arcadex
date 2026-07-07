export type Registration = {
  name: string;
  email: string;
  college_name: string;
  payment_status: "pending" | "paid";
  mobile_num: string;
  discord_id: string;

  games: {
    game_id: string;
    ign: string;
  }[];

  cash_free_order_id?: string;
};
