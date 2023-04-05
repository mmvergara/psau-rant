import { getAllRant } from "@/firebase/services/rant_services";
import { RantWithId } from "@/types/models/rant_types";

import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Rant from "./RantPiece";
import RantControls from "./RantControls";

const Rants = () => {
  const [rants, setRants] = useState<RantWithId[]>([]);

  const fetchRants = async () => {
    const { error, data } = await getAllRant();
    if (error || !data) return toast.error(error);
    setRants(data);
  };

  useEffect(() => {
    fetchRants();
  }, []);
  return (
    <Container maxWidth="md">
      <RantControls />
      {rants.map((rant) => (
        <Rant key={rant.rant_id} rantWithId={rant} />
      ))}
    </Container>
  );
};

export default Rants;
