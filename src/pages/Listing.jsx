import {
  Link,
  IconButton,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import http from "../http";

function Listings() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [listing, setListing] = useState(null);
  const [activityList, setActivityList] = useState([]);
  const [isNotAdminView, setIsNotAdminView] = useState(
    localStorage.getItem("isAdminView") === "true" // Read from local storage
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http.get(`/activitylisting/${id}`).then((res) => {
      setListing(res.data);
      setLoading(false);
    });
    http
      .get(`/activity/activities-by-listing/${id}`)
      .then((res) => {
        console.log("Response data:", res.data); // Log response data
        setActivityList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching listings:", error); // Log any errors
      });
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {!loading && (
        <Box
          sx={{
            flex: 1,
            my: 2,
            padding: "16px", // Optional: Add some padding to create space between the shadow and the content
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Adjust the values as needed
          }}
        >
          <Typography variant="h5" sx={{ my: 2, fontSize: "2rem" }}>
            {listing.title}
          </Typography>
          <Typography sx={{ whiteSpace: "pre-wrap", fontSize: "1.5rem" }}>
            {listing.category}
          </Typography>
          <Typography sx={{ whiteSpace: "pre-wrap", fontSize: "1.5rem" }}>
            ${listing.nprice}
          </Typography>
          <Typography sx={{ whiteSpace: "pre-wrap", fontSize: "1.2rem" }}>
            Description: {listing.description}
          </Typography>
          <Typography sx={{ whiteSpace: "pre-wrap", fontSize: "1.2rem" }}>
            Address: {listing.address}
          </Typography>
        </Box>
      )}
      <Box sx={{ flex: 1, marginLeft: 2 }}>
        <Typography variant="h5" sx={{ my: 2 }}>
          Available Booking Dates:
        </Typography>
        <Grid container spacing={2}>
          {activityList.map((activity, i) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={activity.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Date: {activity.date}
                    </Typography>
                    <Typography sx={{ whiteSpace: "pre-wrap" }}>
                      Available spots left: {activity.availSpots}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default Listings;
