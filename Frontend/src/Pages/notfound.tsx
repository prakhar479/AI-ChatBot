import { Typography } from "@mui/material";

const NotFound = () => {
  return (
    <>
      <Typography variant="h2" align="center" padding={2} style={{
        color: "#293F92",
        fontWeight: "bold",
        border: "5px solid grey",
        padding: "10px",
        margin: "auto",
        borderRadius: "10px",
      }}>
        Page Not Found
      </Typography>
      <img src="404.gif" style={{ objectFit: "cover", width: "100%", height: "90vh" }} />
    </>
  )
}

export default NotFound;