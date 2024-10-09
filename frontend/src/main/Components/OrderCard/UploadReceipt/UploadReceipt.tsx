/* eslint-disable @typescript-eslint/no-explicit-any */
import { useActions } from "@hooks/useActions";
import { Button, Divider } from "@nextui-org/react";
import { toast } from "react-toastify";

interface IUploadReceiptProps {
  orderId: string;
  isAdmin: boolean;
}

const UploadReceipt = ({ orderId }: IUploadReceiptProps) => {
  const { getReceiptFile } = useActions();

  const upload = async () => {
    try {
      const response: any = await getReceiptFile(orderId);
      console.log(response);
      const url = window.URL.createObjectURL(
        new Blob([response.payload], { type: "application/pdf" })
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Ошибка при загрузке чека:", error);
      toast.error("Произошла ошибка выгрузки чека");
    }
  };

  return (
    <>
      <Divider />
      <Button onClick={upload} fullWidth color="warning" className="text-white">
        Выгрузить чек
      </Button>
    </>
  );
};

export default UploadReceipt;
