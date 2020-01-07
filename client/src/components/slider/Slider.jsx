import React, { Component } from "react";
import Slide from "./Slide";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import SliderFooter from "./SliderFooter";

import "./slider_style.css";

export default class Slider extends Component {
  state = {
    images: [],
    currentImageIndex: 1,
    modalShowClass: "modal-display-block"
  };

  componentDidUpdate(){
    if(this.props.pics !== this.state.images){
      this.setState({images:this.props.pics})
    }
  }

  getCurrentImage() {
    const index = this.state.currentImageIndex;
    const currentImage = this.state.images[index];

    return currentImage;
  }

  goToPrevious = () => {
    if (this.state.currentImageIndex === 0) {
      return;
    } else {
      this.setState({ currentImageIndex: this.state.currentImageIndex - 1 });
    }
  };

  goToNext = () => {
    if (this.state.currentImageIndex === this.state.images.length - 1) {
      return;
    } else {
      this.setState({ currentImageIndex: this.state.currentImageIndex + 1 });
    }
  };

  closeSlider = () => {
    this.setState({modalShowClass: "modal-display-none"})
  };
  render() {
    return (
      <div className={this.state.modalShowClass}>
        <div id="slider">
          <div id="mainSlider">
            <LeftArrow leftArrowFunction={this.goToPrevious} />
            <Slide image={this.getCurrentImage()} />
            <RightArrow
              rightArrowFunction={this.goToNext}
              closeButtonFunction={this.closeSlider}
            />
          </div>
          <SliderFooter
            currentIndex={this.state.currentImageIndex}
            numOfAllPics={this.state.images.length}
          />
        </div>
      </div>
    );
  }
}
