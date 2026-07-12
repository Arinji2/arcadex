export type Registration = {
  name: string;
  email: string;
  college_name: string;
  payment_status: "pending" | "paid";
  payment_screenshot?: string;
  mobile_num: string;
  discord_id: string;
  games: RegistrationGame[];
  verified: boolean;
  is_pubg?: boolean;
  pubg_igns?: string[];
};

export type RegistrationGame = {
  game_id: string;
  ign: string;
};
