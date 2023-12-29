import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = {
  root: {
    padding: 20,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column"
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: 10,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.02)"
    }
  },
  media: {
    height: 140
  },
  details: {
    display: "flex",
    flexDirection: "column",
    margin: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20
  },
  pos: {
    marginTop: 10
  },
  description: {
    textAlign: "justify",
    marginBottom: 15
  },
  source: {
    fontStyle: "italic",
    color: "#555"
  },
  viewSource: {
    textDecoration: "none",
    color: "#007BFF",
    "&:hover": {
      textDecoration: "underline"
    }
  }
};

class News extends React.Component {
  render() {
    let { news, options, classes } = this.props;
    news = news.articles;

    return (
      <Grid container className={classes.root} style={{ height: this.props.height, background: '#f0f8ff' }}>
        <Typography className={classes.title} gutterBottom style={{ color: '#333', borderBottom: '2px solid #333' }}>
          <b>Latest News</b>
        </Typography>
        {news.map((data, i) => (
          <Card key={i} className={classes.card} style={{ background: "linear-gradient(45deg, #00acc1, #673ab7)", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardMedia
              className={classes.media}
              component="img"
              alt="No Image"
              image={data.urlToImage}
            />
            <div className={classes.details}>
              <CardContent>
                <Typography className={classes.pos} variant="h6" gutterBottom style={{ color: '#FFFFFF' }}>
                  {data.title}
                </Typography>
                <Typography
                  className={classes.description}
                  variant="body1"
                  component="p"
                  gutterBottom
                  style={{ color: '#333' }}
                >
                  {data.description}
                </Typography>
                <Typography className={classes.pos} color="textSecondary" style={{ color: '#333' }}>
                  By: {data.author}
                </Typography>
                <Typography className={classes.source} color="textSecondary" style={{ color: '#333' }}>
                  Source: {data.source.name}
                </Typography>
                <Typography color="textSecondary" style={{ color: '#333' }}>
                  Date:{" "}
                  {new Date(data.publishedAt).toLocaleString("en-US", options)}
                </Typography>
                <Typography className={classes.pos}>
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.viewSource}
                    style={{ color: '#666' }}
                  >
                    Read more...
                  </a>
                </Typography>
              </CardContent>
            </div>
          </Card>
        ))}
      </Grid>
    );


  }
}

const mapStateToProps = (state) => {
  return {
    news: state.newsReducer.news
  };
};

export default connect(mapStateToProps, null)(withStyles(styles)(News));
