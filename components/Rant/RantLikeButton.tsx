import { handleLikeRant } from "@/firebase/services/rant_services";
import { useUserData } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";

type Props = {
  liked: boolean;
  totalLike: number;
  rantId: string;
};

const RantLikeButton = ({ liked, totalLike, rantId }: Props) => {
  const { user } = useUserData();
  const [isLiked, setIsLiked] = useState(liked || false);
  const [totalLikes, setTotalLikes] = useState(totalLike || 0);
  const likeHandler = async () => {
    setIsLiked((o) => !o);
    setTotalLikes((tl) => (!isLiked ? tl - 1 : tl + 1));
    const { error } = await handleLikeRant(rantId, isLiked, user?.uid);
    if (error) return toast.error(error);
  };

  return (
    <Button
      color="error"
      variant="contained"
      sx={{
        display: "flex",
        gap: 1,
        borderRadius: "20px",
        px: 0,
        bgcolor: "#f23c3d",
      }}
      onClick={likeHandler}
    >
      <FavoriteBorderIcon /> {totalLikes}
    </Button>
  );
};

export default RantLikeButton;
