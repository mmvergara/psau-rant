import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import { rantSchema } from "@/utilities/ValidationSchemas";
import useAuthStateRouter from "@/utilities/hooks/useAuthStateRouter";
import { addRant } from "@/firebase/services/rant_services";
import { toast } from "react-toastify";

const RantCreate = () => {
  const { user } = useAuthStateRouter();
  const handleSubmitRant = async () => {
    const { rant_title, rant_content } = formik.values;
    if (!user) return;
    const { data, error } = await addRant({
      rant_title,
      rant_content,
      rant_author: user.uid,
    });
    if (data) toast.success("Rant Created");
    if (error) toast.error(error);
  };

  const formik = useFormik({
    initialValues: {
      rant_title: "",
      rant_content: "",
    },
    validationSchema: rantSchema,
    onSubmit: handleSubmitRant,
  });

  return (
    <Container maxWidth="sm">
      <Box
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
          <Typography>Create Rant 😐</Typography>
        </Box>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            padding: 2,
            pt: 2,
            bgcolor: "#eef5ef",
            borderRadius: "0px 0px 5px 5px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="rant_title"
            label="Rant Title"
            variant="outlined"
          />
          <TextField
            name="rant_content"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ mt: 2 }}
            label="Rant 💢"
            variant="outlined"
            multiline
          />
          <Button type="submit" sx={{ mt: 2 }} variant="contained">
            Submit Rant 😡
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default RantCreate;
