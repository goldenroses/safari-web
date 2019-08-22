/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import { HeartSpinner } from "react-spinners-kit";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { BrushSharp, Close, Edit } from "@material-ui/icons";
import Table from "../../components/Table/Table";
import CardBody from "../../components/Card/CardBody";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import CardAvatar from "../../components/Card/CardAvatar";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placesData: [],
      imagesData: [],
      isLoaded: false,
      albumName: "",
      show: false,
      placeItem: [],
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.updatePlace = this.updatePlace.bind(this);
  }

  updatePlace() {
    var currentPlaceItem = this.state.placeItem;
    console.log(currentPlaceItem);

    fetch("https://safari-app.herokuapp.com/place/" + currentPlaceItem.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: currentPlaceItem.title,
        description: currentPlaceItem.description,
        cardImage: currentPlaceItem.cardImage,
        imageUrl: currentPlaceItem.imageUrl,
        content: currentPlaceItem.content
      })
    });
  }

  handleChange = (event, type) => {
    let x = event.target.value;
    console.log("simple : " + x);
    this.setState(() => {
      let oldValue = Object.assign({}, this.state);
      oldValue.placeItem[type] = x;
      return { jasper: oldValue };
    });
  };

  showModal = item => {
    this.setState({ show: true });
    this.setState({ placeItem: item });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  componentDidMount() {
    // get images
    fetch("https://safari-app.herokuapp.com/aws/buckets/bucketName/safari-app")
      .then(res => res.json())
      .then(response => {
        this.setState({
          isLoaded: true,
          imagesData: response
        });
      });

    // get places
    fetch("https://safari-app.herokuapp.com/place")
      .then(res => res.json())
      .then(response => {
        this.setState({
          placesData: response
        });
      });
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  render() {
    const { classes } = this.props;
    var { isLoaded, placesData, imagesData, show, placeItem } = this.state;

    var imagesResponse = imagesData.map(item => [
      item.key === null ? (
        "No Image Uploaded"
      ) : item.key.match(item.imageUrl) == null ? (
        <div style={{ display: "none" }}>
          <h6>Not</h6>
        </div>
      ) : (
        <div>
          <img
            height={50}
            alt={"loading.."}
            src={"https://safari-app.s3.us-west-2.amazonaws.com/" + item.key}
          />
        </div>
      ),
      item.key.match("Samburu"),
      item.key,
      item.imageUrl,
      item.storageClass,
      <TableCell key="images" className={classes.tableActions}>
        <Tooltip
          id="tooltip-top"
          title="Edit Task"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton aria-label="Edit" className={classes.tableActionButton}>
            <Edit
              className={classes.tableActionButtonIcon + " " + classes.edit}
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          id="tooltip-top-start"
          title="Remove"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton aria-label="Close" className={classes.tableActionButton}>
            <Close
              className={classes.tableActionButtonIcon + " " + classes.close}
            />
          </IconButton>
        </Tooltip>
      </TableCell>
    ]);

    var tableData = placesData.map(item => [
      item.id,
      item.title,
      item.description,
      item.content,
      <TableCell key="images" className={classes.tableActions}>
        <Tooltip
          id="tooltip-top"
          title="Edit Task"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            onClick={() => this.showModal(item)}
            aria-label="Edit"
            className={classes.tableActionButton}
          >
            <Edit
              className={classes.tableActionButtonIcon + " " + classes.edit}
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          id="tooltip-top-start"
          title="Remove"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton aria-label="Close" className={classes.tableActionButton}>
            <Close
              onClick={() => this.hideModal}
              className={classes.tableActionButtonIcon + " " + classes.close}
            />
          </IconButton>
        </Tooltip>
      </TableCell>,
      <div>
        <img
          height={50}
          alt={"loading.."}
          src={
            "https://safari-app.s3.us-west-2.amazonaws.com/" +
            item.imageUrl +
            "/card.jpeg"
          }
        />
      </div>,
      item.imageUrl,
      item.imageUrl === null
        ? "No Image Uploaded"
        : imagesData.map(image => [
            image.key.match(item.imageUrl) == null ? (
              <div style={{ display: "none" }}>
                <h6>Not</h6>
              </div>
            ) : (
              <div>
                <img
                  height={50}
                  alt={"loading.."}
                  src={
                    "https://safari-app.s3.us-west-2.amazonaws.com/" + image.key
                  }
                />
              </div>
            )
          ])
    ]);

    if (!isLoaded) {
      return (
        <div className={classes.centerDiv}>
          <HeartSpinner size={100} color="#686769" />;
        </div>
      );
    }
    if (imagesData == null) {
      return <div className={classes.centerDiv}>Cannot fetch image data</div>;
    }

    if (show) {
      return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Place</h4>
                  <p className={classes.cardCategoryWhite}>Edit {}</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText={placeItem.id}
                        id="id-disabled"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText={placeItem.title}
                        inputProps={{
                          value: placeItem.title,
                          placeholder: "Regular",
                          onChange: e => this.handleChange(e, "title"),
                          readOnly: false
                        }}
                        id="title"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                      <CustomInput
                        labelText="Description"
                        id="description"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          value: placeItem.description,
                          onChange: e => this.handleChange(e, "description"),
                          rows: 4
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                      <CustomInput
                        labelText="Content"
                        id="content"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          value: placeItem.content,
                          onChange: e => this.handleChange(e, "content"),
                          rows: 7
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Image URL"
                        id="first-name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: placeItem.imageUrl,
                          onChange: e => this.handleChange(e, "imageUrl")
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Category"
                        id="category"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: placeItem.category,
                          onChange: e => this.handleChange(e, "cateogory")
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer></GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="primary" onClick={this.updatePlace}>
                    Update Place
                  </Button>
                  <IconButton
                    onClick={this.hideModal}
                    aria-label="Close"
                    className={classes.tableActionButton}
                  >
                    <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                    />
                  </IconButton>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <CardAvatar profile>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    {/* eslint-disable-next-line no-undef */}
                    <img src={BrushSharp} alt="..." />
                  </a>
                </CardAvatar>
                <CardBody profile>
                  <h6 className={classes.cardCategory}>{placeItem.title}</h6>
                  <h4 className={classes.cardTitle}>{placeItem.description}</h4>
                  <p className={classes.description}>{placeItem.content}</p>
                  <Button color="primary" round>
                    Preview
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      );
    }

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Places</p>
                <h3 className={classes.cardTitle}>
                  29 <small>Places</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more space REAL
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Categories</p>
                <h3 className={classes.cardTitle}>8</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Fixed Issues</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Local Data OFfer
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card plain>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Places</h4>
                <p className={classes.cardCategoryWhite}>
                  All registered places
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    "Category Id",
                    "Place title",
                    "Place description",
                    "Content",
                    "Actions",
                    "Card Image",
                    "Bucket Name",
                    "Image URLs"
                  ]}
                  tableData={tableData}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card plain>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Places</h4>
                <p className={classes.cardCategoryWhite}>All Images</p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    "Image Id",
                    "Image description",
                    "Card Image",
                    "Image URLs"
                  ]}
                  tableData={imagesResponse}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
