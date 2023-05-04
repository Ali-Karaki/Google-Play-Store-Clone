import axios from "axios";
import React, { useState, useEffect } from "react";

type Props = {};

const Footer = () => {
  interface GeolocationInfo {
    country_name: string;
    city: string;
    // other properties
  }

  const [details, setDetails] = useState<GeolocationInfo>({
    country_name: "",
    city: "" /* ... other properties */,
  });

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    fetch(
      "https://geolocation-db.com/json/f2e84010-e1e9-11ed-b2f8-6b70106be3c8"
    )
      .then((response) => response.json())
      .then((data) => setDetails(data));
  };

  return (
    <footer style={styles.container}>
      <div style={styles.line}></div>
      <div style={styles.linkContainer}>
        <a
          style={styles.leftLinks}
          href="https://play.google.com/about/play-terms/emea/index.html"
        >
          Terms of Service
        </a>
        <a style={styles.leftLinks} href="#">
          About the Website
        </a>
      </div>
      <div>
        <div style={styles.location}>
          <p style={styles.text}>
            City: {details.city}, {details.country_name}
          </p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  container: {
    height: 50,
    margin: "50px 0 0 0",
    display: "flex",
    justifyContent: "space-between",
    borderTop: " 1px solid #e8eaed",
  },

  line: {
    // borderColor: "rgb(232,234,237)",
    // borderBottom:" 1px solid",
    // marginBottom: "36px",
    // paddingTop: "36px",
    // width: "100%",
  },

  linkContainer: {},

  leftLinks: {
    marginRight: "10px",
    marginLeft: "10px",
    color: "#5F6368",
    textDecoration: "none",
    fontSize: ".75rem",
    lineHeight: "48px",
  },

  location: {
    margin: "0",
    marginRight: "30px",
  },

  text: {
    fontSize: ".75rem",
    color: "#5F6368",

  },
} as const;

export default Footer;
