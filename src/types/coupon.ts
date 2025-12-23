export interface iCoupon {
  id: string;
  title: string | undefined;
  is_enabled: number | undefined;
  percent: number | undefined;
  due_date: number | undefined;
  code: string;
}

export interface iCouponForm {
  title: string;
  is_enabled: number | undefined;
  percent: number | undefined;
  due_date: string;
  code: string;
}

export interface iCreateCouponPayload {
  title: string;
  is_enabled: number;
  percent: number;
  due_date: number;
  code: string;
}
