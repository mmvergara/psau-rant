import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import { handleLikeRant } from "@/firebase/services/rant_services";
import { useUserData } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

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
    let liked: boolean = isLiked;
    let currentTotalLikes: number = totalLikes;
    setIsLiked((o) => {
      liked = !o;
      return liked;
    });
    setTotalLikes((tl) => {
      currentTotalLikes = isLiked ? tl - 1 : tl + 1;
      return currentTotalLikes;
    });
    const { error } = await handleLikeRant(rantId, isLiked, user?.uid);
    if (error) {
      setIsLiked(!liked);
      setTotalLikes(liked ? currentTotalLikes - 1 : currentTotalLikes + 1);
      return toast.error(error);
    }
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
      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />} {totalLikes}
    </Button>
  );
};

export default RantLikeButton;
