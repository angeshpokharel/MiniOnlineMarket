import { Box, Grid, Link, Typography, Divider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import MOM, { API_URL } from "../../../api/api";
import AddAlertMessage from "../../../components/alert/Alert";
import { SOMETHING_WENT_WRONG } from "../../../utils/constants";
import ShowMoreText from "react-show-more-text";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  hiddenInput: {
    display: "none",
  },
});

export default function ModelDetailCard(props) {
  const classes = useStyles();
  const [modelInfoList, setModelInfoList] = useState();
  const [totalVotePerModel, setTotalVotePerModel] = useState();
  const [selectedModelId, setSelectedModelId] = useState();

  useEffect(() => {
    if (props.modelObjects !== null) {
      setModelInfoList(props.modelObjects);
    }
  }, [props.modelObjects]);
  return (
    <>
      <Box display="flex" flexDirection="row">
        <Grid container spacing={1}>
          {modelInfoList && modelInfoList.length !== 0 ? (
            modelInfoList.map((modelObject, index) => (
              <Grid item xs={4}>
                <Card className={classes.root} key={index}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={modelObject.modelName || "Contemplative Reptile"}
                      height="140"
                      image={
                        modelObject.modelImage
                          ? modelObject.modelImage[
                              modelObject.modelImage.length - 1
                            ].filePath
                          : "https://en.wikipedia.org/wiki/Maharishi_International_University#/media/File:Maharishi_International_University_logo_1.png"
                      }
                      title={modelObject.modelName || "Contemplative Reptile"}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {modelObject.modelName || "Lizard"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <ShowMoreText
                          /* Default options */
                          lines={2}
                          more="Show more"
                          less="Show less"
                          anchorClass="text-primary"
                          expanded={false}
                          width={280}
                        >
                          {modelObject.modelInfo ||
                            `Please add some model info`}
                        </ShowMoreText>
                      </Typography>
                      <Divider></Divider>
                      <Typography gutterBottom variant="body2" component="h4">
                        Total Votes - {modelObject.totalVotes}
                      </Typography>
                      <Divider></Divider>
                      <Typography gutterBottom variant="h5" component="h2">
                        <Link
                          href={"model-details?id=" + modelObject.id}
                          variant="body1"
                        >
                          Vote Details
                        </Link>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h1">No Models Added Yet</Typography>
          )}
        </Grid>
      </Box>
    </>
  );
}
