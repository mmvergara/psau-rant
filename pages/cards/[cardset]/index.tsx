import { getCardSetById } from "@/firebase/services/cards_services";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CardPreview = () => {
  const router = useRouter();
  const cardset = router.query.cardset;
  const getCardSet = async () => {
    const { data, error } = await getCardSetById(cardset as string);
    console.log(data);
    if(error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getCardSet();
  }, []);

  return <></>;
};

export default CardPreview;
