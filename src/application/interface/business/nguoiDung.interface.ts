
export interface NguoiDung {
   id: number;
   ten: string;
   email: string;
   password: string;
   dien_thoai: string;
   ngay_sinh: string;
   gioi_tinh: string;
   role: string;
   ky_nang: Array<string>;
   chung_chi: Array<string>;
}
