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
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import progressBar from "assets/img/spinner.gif";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { website, server } from "variables/general.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { BrushSharp, Close, Edit } from "@material-ui/icons";
import Table from "../../components/Table/Table";
import CardBody from "../../components/Card/CardBody";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import CardAvatar from "../../components/Card/CardAvatar";

class Dashboard extends React.Component {
  state = {
    value: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      progressIcon: progressBar,
      data: [],
      isloaded: false
    };
  }

  componentDidMount() {
    fetch("https://safari-app.herokuapp.com/place")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          data: json,
          imageUrl: ""
        });
      });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  loadImage = url => {
    this.setState({
      imageUrl: url
    });
  };

  getImage(path) {
    FirebaseApp.storage().refFromURL(path).getDownloadURL().then((url) => {
      this.setState({img: {uri: url}});
    })
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;

    var { isLoaded, data } = this.state;
    var tableData = data.map(item => [
      item.id,
      item.title,
      item.description,
      item.content,
      item.cardImage,
      <CardAvatar profile>
        <a href="#pablo" onClick={e => e.preventDefault()}>
          <img src={item.imageUrl} alt="..." />
        </a>
      </CardAvatar>,
      item.imageUrl,
      <TableCell className={classes.tableActions}>
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

    if (!isLoaded) {
      return <div image={this.state.progressIcon} />;
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
                  Tracked from Github
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <CustomTabs
              title="Places:"
              headerColor="warning"
              tabs={[
                {
                  tabName: "Active places",
                  tabIcon: BrushSharp,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={tableData}
                    />
                  )
                },
                {
                  tabName: "Drafts",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  )
                },
                {
                  tabName: "Deleted",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  )
                }
              ]}
            />
          </GridItem>
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
                    "Category description",
                    "Content",
                    "Card Image",
                    "Image URLs"
                  ]}
                  tableData={tableData}
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
