import { updateUsernameSchema } from "@/utilities/ValidationSchemas";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { addUserUsername } from "@/firebase/services/auth_service";
import { useUserData } from "@/context/useName";
import { useRouter } from "next/router";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -120%)",
  width: 300,
  bgcolor: "#f5f5dc",
  border: "5px solid #0b4619",
  boxShadow: 24,
  p: 4,
};

const AddUsernameModal = () => {
  const { user } = useUserData();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const handleAddUsername = async () => {
    if (!user) return;
    const { username } = formik.values;

    setIsLoading(true);
    const { errM: errM2 } = await addUserUsername(user.uid, username);
    setIsLoading(false);

    if (errM2) {
      toast.error(errM2);
      return;
    }

    toast.success("Successfully updated username");
    router.reload();
  };

  if (!user) router.push("/auth/signin");

  const formik = useFormik({
    initialValues: { username: "" },
    onSubmit: handleAddUsername,
    validationSchema: updateUsernameSchema,
  });

  return (
    <Modal open={true}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={style}>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontSize: "14px", mb: "15px" }}
        >
          Welcome! 👑 <br /> Please add your username
        </Typography>
        <TextField
          name="username"
          label="Username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            ml: "auto",
            display: "flex",
            mt: "20px",
            color: "white",
            width: "150px",
          }}
        >
          {isLoading ? (
            <CircularProgress size={25} color="inherit" />
          ) : (
            "Add Username"
          )}
        </Button>
      </Box>
    </Modal>
  );
};

export default AddUsernameModal;
