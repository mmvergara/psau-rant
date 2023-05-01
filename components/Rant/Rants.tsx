import CenterCircularProgress from "../Layout/CenterCircularProgress";
import RantControls from "./RantControls";
import Container from "@mui/material/Container";
import Rant from "./RantPiece";
import { useEffect, useState } from "react";
import { getAllRant } from "@/firebase/services/rant_services";
import { RantWithId } from "@/types/models/rant_types";
import { useUserData } from "@/context/AuthContext";
import { toast } from "react-toastify";

const Rants = () => {
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
      {navigator.platform.toUpperCase() === "ANDROID" && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Rants</h1>
          <p className="text-sm text-gray-500">
            You can swipe left or right to navigate
          </p>
        </div>
      )}
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
