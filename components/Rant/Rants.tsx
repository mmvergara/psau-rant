import CenterCircularProgress from "../Layout/CenterCircularProgress";
import RantControls from "./RantControls";
import DownloadApp from "../DownloadApp/DownloadApp";
import Container from "@mui/material/Container";
import Rant from "./RantPiece";
import { useEffect, useState } from "react";
import { getAllRant } from "@/firebase/services/rant_services";
import { RantWithId } from "@/types/models/RantTypes";
import { useUserData } from "@/context/AuthContext";
import { toast } from "react-toastify";

const Rants = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const { user } = useUserData();
  const [rants, setRants] = useState<RantWithId[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const fetchRants = async () => {
    const { error, data } = await getAllRant();
    setIsFetching(false);
    if (error || !data) return toast.error(error);
    setRants(data);
  };
  const handleDeleteRant = (rant_id: string) => {
    const newRants = rants.filter((rant) => rant.rant_id !== rant_id);
    setRants(newRants);
  };
  useEffect(() => {
    fetchRants();
  }, []);
  return (
    <Container maxWidth="md">
      {isMobile && <DownloadApp />}
      {user && <RantControls />}
      {rants.map((rant) => (
        <Rant
          onRantDelete={handleDeleteRant}
          key={rant.rant_id}
          rantWithId={rant}
        />
      ))}
      {isFetching && <CenterCircularProgress />}
    </Container>
  );
};

export default Rants;
