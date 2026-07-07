export type Registration = {
  name: string;
  email: string;
  college_name: string;
  payment_status: "pending" | "paid";
  mobile_num: string;
  discord_id: string;

  games: RegistrationGame[];

  cash_free_order_id?: string;
};

export type RegistrationGame = {
  game_id: string;
  ign: string;
};
