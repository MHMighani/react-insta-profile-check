import React, { Component } from "react";
import Slide from "./Slide";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import SliderFooter from "./SliderFooter";

import "./slider_style.css";

export default class Slider extends Component {
  state = {
    currentImageIndex: 0,
    showModal: false
  };

  getCurrentImageDate(currentImageName){
    if(currentImageName){
      const splitedName = currentImageName.split("_")
      const timeStamp = splitedName[splitedName.length-1]
      
      return new Date(parseInt(timeStamp))
    }
    
  }

  componentDidUpdate(){
    if(this.state.showModal!==this.props.showModal){
      
      this.setState({currentImageIndex:0,showModal:this.props.showModal})
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
    if (this.state.currentImageIndex === this.props.pics.length - 1) {
      return;
    } else {
      this.setState({ currentImageIndex: this.state.currentImageIndex + 1 });
    }
  };

  closeSlider = () => {
    this.setState({modalShowClass: "modal-display-none"})
  };

  modalShowClass = () => {
    if(this.state.showModal){
      return "modal-display-block"
    }
    return "modal-display-none"
  }


  render() {
    const {currentImageIndex} = this.state
    const {pics,toggleModal} = this.props

    return (
      <div className={this.modalShowClass()}>
        <div id="slider">
          <div id="mainSlider">
            <LeftArrow leftArrowFunction={this.goToPrevious} />
            <Slide image={pics[currentImageIndex]} />
            <RightArrow
              toggleModal={toggleModal}
              rightArrowFunction={this.goToNext}
              closeButtonFunction={this.closeSlider}
            />
          </div>
          <SliderFooter
            currentIndex={currentImageIndex}
            numOfAllPics={pics.length}
            date={this.getCurrentImageDate(pics[currentImageIndex])}
          />
        </div>
      </div>
    );
  }
}
