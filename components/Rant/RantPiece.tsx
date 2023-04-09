import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getTimeElapsedString } from "@/utilities/Date";
import Divider from "@mui/material/Divider";
import { RantWithId } from "@/types/models/rant_types";
import RantLikeButton from "./RantLikeButton";
import { useUserData } from "@/context/AuthContext";

type Props = {
  rantWithId: RantWithId;
};
const Rant = ({ rantWithId }: Props) => {
  const { user } = useUserData();
  const {
    rant_title,
    rant_content,
    rant_author_username,
    rant_date,
    rant_id,
    rant_likes,
  } = rantWithId;
  const isLiked = user?.uid ? !!rant_likes[user.uid] : false;
  const totalLikes = Object.values(rant_likes).length;
  const timeElapsed = getTimeElapsedString(new Date(rant_date.toDate()));
  return (
    <Box
      component="article"
      sx={{
        bgcolor: "transparent",
        mt: 5,
        width: "100%",
        maxWidth: "1000px",
        boxShadow: 4,
      }}
    >
      <Box
        sx={{
          padding: 1.5,
          bgcolor: "#0b4619e1",
          color: "white",
          borderRadius: "5px 5px 0px 0px",
        }}
      >
        <Typography variant="h5">{rant_title}</Typography>
      </Box>
      <Box
        sx={{
          padding: 1.5,
          pt: 2,
          bgcolor: "#eef5ef",
          borderRadius: "0px 0px 5px 5px",
        }}
      >
        <Typography variant="body1">{rant_content}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pr: 2,
            py: 1,
            pt: 2,
          }}
        >
          <Box
            color="dimgray"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Typography sx={{ fontSize: "13px" }}>
              {rant_author_username}
            </Typography>
            <Typography sx={{ display: "inline", fontSize: 10 }}>
              <Divider />
              {timeElapsed}
            </Typography>
          </Box>
          <RantLikeButton
            liked={isLiked}
            rantId={rant_id}
            totalLike={totalLikes}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Rant;
