import useAuthStateRouter from "@/utilities/hooks/useAuthStateRouter";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import { rantSchema } from "@/utilities/ValidationSchemas";
import { addRant, getAllRant } from "@/firebase/services/rant_services";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const RantCreate = () => {
  const { user } = useAuthStateRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitRant = async () => {
    const { rant_title, rant_content } = formik.values;
    if (!user) return;
    setIsLoading(true);
    const { error } = await addRant({
      rant_title,
      rant_content,
      rant_author: user.uid,
    });
    setIsLoading(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Rant Created");
    formik.resetForm();
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
            name="rant_title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rant_title}
            error={
              formik.touched.rant_title && Boolean(formik.errors.rant_title)
            }
            helperText={formik.touched.rant_title && formik.errors.rant_title}
            label="Rant Title"
            variant="outlined"
          />
          <TextField
            name="rant_content"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rant_content}
            error={
              formik.touched.rant_content && Boolean(formik.errors.rant_content)
            }
            helperText={
              formik.touched.rant_content && formik.errors.rant_content
            }
            sx={{ mt: 2 }}
            label="Rant 💢"
            variant="outlined"
            multiline
          />
          <Button
            type="submit"
            sx={{ mt: 2, color: "white" }}
            variant="contained"
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "Submit Rant 😡"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default RantCreate;
