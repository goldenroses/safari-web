import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
//core components
import Button from "components/CustomButtons/Button.jsx";

import dropdownStyle from "assets/jss/material-dashboard-react/dropdownStyle.jsx";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isLoaded: false,
      selectedValue: 1,
      selectedCategory: 1,
      categoryTitle: "Select",
      categoryData: [],
      category: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, type) => {
    let x = event.target.value;
    this.setState(() => {
      let oldValue = Object.assign({}, this.state);
      oldValue.placeItem[type] = x;
      return { jasper: oldValue };
    });
  };

  componentDidMount() {
    // get category
    console.log("categories loaded");
    fetch("https://safari-app.herokuapp.com/category")
      .then(res => res.json())
      .then(response => {
        this.setState({
          isLoaded: true,
          categoryData: response
        });
      });
  }
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleCategoryChange = (value, title) => {
    var category_id = value;

    console.log(`Category ${category_id} `);

    this.setState({
      selectedValue: value,
      categoryTitle: title,
      category: category_id
    });
    this.props.sendData(value);
    // this.props.selectedValue(value);
    this.handleClose(this);
    console.log(`Current Category ${category_id}`);
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open, categoryData } = this.state;

    // this.handleCategoryChange(4, "title");

    var dropDownData = categoryData.map(item => [
      item.id,
      item.title,
      item.description
    ]);

    return (
      <div className={classes.manager}>
        <Button
          buttonRef={node => {
            this.anchorEl = node;
          }}
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={open ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
          className={classes.buttonLink}
        >
          {this.state.categoryTitle.toLowerCase()}
        </Button>
        <Poppers
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !open }) +
            " " +
            classes.pooperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom"
                    ? "selectedValuecenter top"
                    : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList role="menu">
                    {dropDownData.map((data, index) => (
                      <MenuItem
                        onClick={() =>
                          this.handleCategoryChange(data[0], data[1])
                        }
                        onLoad={() => this.handleCategoryChange(this.props.selectedValue, "title")}
                        key={data[0]}
                        selected={index === this.state.selectedValue - 1}
                      >
                        {data[1]}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
        {this.props.selectedValue}
      </div>
    );
  }
}

export default withStyles(dropdownStyle)(Dropdown);
