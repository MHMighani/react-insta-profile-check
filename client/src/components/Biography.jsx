import React, { Component } from "react";
import { Accordion, Icon } from "semantic-ui-react";

export default class Biography extends Component {
  state = { activeIndex: this.props.isActive };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const biographyText = this.props.biographyText;
    if (biographyText === "") {
      return (
        <p
          style={{
            textDecoration: "line-through"
          }}
        >
          Biography
        </p>
      );
    }

    const { activeIndex } = this.state;
    

    return (
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Biography
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          {biographyText}
        </Accordion.Content>
      </Accordion>
    );
  }
}
