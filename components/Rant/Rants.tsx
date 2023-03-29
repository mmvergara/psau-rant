import { getAllRant } from "@/firebase/services/rant_services";
import { RantWithId } from "@/types/models/rant_types";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Rant from "./Rant";

const Rants = () => {
  const router = useRouter();
  const [rants, setRants] = useState<RantWithId[]>([]);

  const fetchRants = async () => {
    const { error, data } = await getAllRant();
    if (error || !data) {
      toast.error(error);
      return;
    }
    setRants(data);
  };

  useEffect(() => {
    fetchRants();
  }, []);
  return (
    <Container maxWidth="md">
      <Button onClick={() => router.push("/rant/create")}>Create Rant</Button>
      {rants.map((rant) => (
        <Rant key={rant.rant_id} rantWithId={rant} />
      ))}
    </Container>
  );
};

export default Rants;
