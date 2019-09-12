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
import progressBar from "assets/img/spinner.gif";
import { HeartSpinner } from "react-spinners-kit";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import { BrushSharp, Close, Edit } from "@material-ui/icons";
import CustomInput from "../../components/CustomInput/CustomInput";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../../components/CustomButtons/Button";
import CardAvatar from "../../components/Card/CardAvatar";
import CardFooter from "../../components/Card/CardFooter";

const styles = {
  centerDiv: {
    display: "inline-block",
    position: "absolute",
    marginTop: "15%" /*set to a negative number 1/2 of your height*/,
    marginLeft: "40%" /*set to a negative number 1/2 of your width*/
  },
  cardAgentWhite: {
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

class Agents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progressIcon: progressBar,
      data: [],
      isLoaded: false,
      agentItem: [],
      newagentItem: [],
      show: false
    };
  }

  handleChange = (event, type) => {
    let x = event.target.value;
    this.setState(() => {
      let oldValue = Object.assign({}, this.state);
      oldValue.agentItem[type] = x;
      return { ok: oldValue };
    });
  };

  showModal = item => {
    if (!item) {
      this.setState({ show: true });
      this.setState({ newItem: true });
    } else {
      this.setState({ show: true });
      this.setState({ agentItem: item });
    }
  };

  createNewAgent() {
    var currentAgentItem = this.state.newagentItem;

    // eslint-disable-next-line react/prop-types
    this.setState({ currentAgentId: this.state.selectedValue });
    console.log("---selectedValue : ----->" + this.state.selectedValue);

    //
    // var array = [];
    // var agent = JSON.parse(
    //   (array["agent_id"] = this.state.selectedValue)
    // );

    fetch("https://safari-app.herokuapp.com/agent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: currentAgentItem.title,
        description: currentAgentItem.description
      })
    });

    //hide modal
    this.hideModal();
  }

  hideModal = () => {
    this.setState({ show: false });
  };

  componentDidMount() {
    fetch("https://safari-app.herokuapp.com/agent")
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

    var {
      isLoaded,
      data,
      show,
      newItem,
      agentItem,
      newagentItem
    } = this.state;
    var agentData = data.map(item => [
      item.id,
      item.title,
      item.description,
      // eslint-disable-next-line react/jsx-key
      <TableCell style={{ borderBottom: "none" }}>
        <IconButton
          onClick={() => this.showModal(item)}
          aria-label="Edit"
          className={classes.tableActionButton}
        >
          <Edit
            className={classes.tableActionButtonIcon + " " + classes.edit}
          />
        </IconButton>
        <IconButton aria-label="Close" className={classes.tableActionButton}>
          <Close
            onClick={() => this.hideModal}
            className={classes.tableActionButtonIcon + " " + classes.close}
          />
        </IconButton>
      </TableCell>
    ]);

    if (!isLoaded) {
      return (
        <div className={classes.centerDiv}>
          <HeartSpinner size={100} color="#c21e56" />;
        </div>
      );
    }

    if (show && !newItem) {
      return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Place</h4>
                  <p className={classes.cardAgentWhite}>Edit {}</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText={agentItem.id}
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
                        labelText={agentItem.title}
                        inputProps={{
                          value: agentItem.title,
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
                          value: agentItem.description,
                          onChange: e => this.handleChange(e, "description"),
                          rows: 4
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}></GridItem>
                  </GridContainer>
                  <GridContainer></GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="primary" onClick={() => this.updateAgent()}>
                    Update Agent
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
                  <h6 className={classes.cardAgent}>{agentItem.title}</h6>
                  <h4 className={classes.cardTitle}>
                    {agentItem.description}
                  </h4>
                  <p className={classes.description}>{agentItem.content}</p>
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
    if (show && newItem) {
      return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Agent</h4>
                  <p className={classes.cardAgentWhite}>Edit {}</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText="Id"
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
                        labelText="Title"
                        inputProps={{
                          value: newagentItem.title,
                          placeholder: "Regular",
                          onChange: e => this.handleNewChange(e, "title"),
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
                          value: newagentItem.desc,
                          onChange: e => this.handleNewChange(e, "description"),
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
                          value: newagentItem.content,
                          onChange: e => this.handleNewChange(e, "content"),
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
                          value: newagentItem.imageUrl,
                          onChange: e => this.handleNewChange(e, "imageUrl")
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Card Image"
                        id="cardImage"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: newagentItem.cardImage,
                          onChange: e => this.handleNewChange(e, "cardImage")
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Dropdown sendData={this.sendData}></Dropdown>
                    </GridItem>
                  </GridContainer>
                  <GridContainer></GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="primary" onClick={() => this.createNewPlace()}>
                    Add new Place
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
                  <h6 className={classes.cardAgent}>
                    {newagentItem.title}
                  </h6>
                  <h4 className={classes.cardTitle}>
                    {newagentItem.description}
                  </h4>
                  <p className={classes.description}>
                    {newagentItem.content}
                  </p>
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
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Categories</h4>
              <p className={classes.cardAgentWhite}>
                All present places categories
              </p>
            </CardHeader>
            <CardBody>
              <Button color="primary" onClick={() => this.createNewAgent()}>
                Add new Agent
              </Button>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  "Agent Id",
                  "Agent title",
                  "Agent description"
                ]}
                tableData={agentData}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

Agents.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Agents);
