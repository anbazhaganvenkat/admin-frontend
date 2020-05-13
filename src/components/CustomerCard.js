import React from "react";
import Avatar from "./core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import CustomerCardName from "./CustomerCardName";
import CustomerCardEmail from "./CustomerCardEmail";

const CustomerCard = props => {
  const useStyles = makeStyles({
    root: {
      alignItems: "center",
      backgroundColor: "#FFF",
      boxShadow:
        "0 8px 10px rgba(0, 0, 0, 0.19), 0 5px 10px rgba(0, 0, 0, 0.082)",
      borderRadius: "3px",
      display: "grid",
      marginBottom: "20px",
      minHeight: "100px",
      minWidth: "200px",
      padding: "15px"
    },
    cardItem: {
      display: "grid",
      gridTemplateColumns: "47px auto"
    },
    cardRight: {
      marginLeft: "0.7rem",
      overflow: "hidden"
    }
  });

  const { firstName, lastName, email } = props;
  const classes = useStyles();

  return (
    <div className="col-lg-6 card-container">
      <div className={classes.root}>
        <div className={classes.cardItem}>
          <div>
            <Avatar
              firstName={firstName}
              lastName={lastName}
              size="30"
            ></Avatar>
          </div>
          <div className={classes.cardRight}>
            <CustomerCardName firstName={firstName} lastName={lastName} />
            <CustomerCardEmail email={email} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
