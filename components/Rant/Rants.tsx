import { getAllRant } from "@/firebase/services/rant_services";
import { RantWithId } from "@/types/models/rant_types";

import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Rant from "./RantPiece";
import RantControls from "./RantControls";
import CenterCircularProgress from "../Layout/CenterCircularProgress";

const Rants = () => {
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
      <RantControls />
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
