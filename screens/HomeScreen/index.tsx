import FormattedMessage from "theme/FormattedMessage";
import Typography from "@mui/material/Typography";

import messages from "./messages";

const HomeScreen: React.FC = () => {
  return (
    <>
      <Typography sx={{ ml: 4 }}>
        <FormattedMessage {...messages.description} />
      </Typography>
    </>
  );
};

export default HomeScreen;
