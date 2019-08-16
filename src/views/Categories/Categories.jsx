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
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { BrushSharp } from "@material-ui/icons";
import Code from "@material-ui/core/SvgIcon/SvgIcon";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Tasks from "../../components/Tasks/Tasks";
import { website } from "../../variables/general";
import progressBar from "assets/img/spinner.gif";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progressIcon: progressBar,
      data: [],
      isloaded: false
    };
  }

  componentDidMount() {
    fetch("https://safari-app.herokuapp.com/category")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          data: json
        });
      });
  }

  render() {
    const { classes } = this.props;

    var { isLoaded, data } = this.state;
    var categoryData = data.map(item => [
      item.id,
      item.title,
      item.description
    ]);

    if (!isLoaded) {
      return <div image={this.state.progressIcon} />;
    }

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
          <CustomTabs
            title="Places:"
            headerColor="success"
            tabs={[
              {
                tabName: "Categories",
                tabIcon: BrushSharp,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1, 2, 3, 4]}
                    tasks={categoryData}
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
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Categories</h4>
              <p className={classes.cardCategoryWhite}>
                All present places categories
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  "Category Id",
                  "Category title",
                  "Category description"
                ]}
                tableData={[
                  ["1", "Outdoors", "Outdoors and Forest"],
                  ["2", "Club and Partying", "Go out and party"],
                  ["3", "Nature", "Baileux"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

Categories.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Categories);
