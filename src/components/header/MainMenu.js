import React, { PureComponent } from 'react';
import {Link/* , NavLink */} from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
//import jpra_logo_sm from "./images/images";


export default class MainMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleLesson = this.handleLesson.bind(this);
    this.debugHelpers = this.debugHelpers.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

 handleLesson(_lessonId) {
  this.props.changeLesson(_lessonId);
 }

 // ****** for NOW, _lessonId doesn't switch lesson data *******
 assignURL(_lessonId, context) { 
    var _currentSlide = this.props.slideControls.lessons[_lessonId].currentSlide

    if(_currentSlide  >= 0 && _currentSlide < this.props.slideInfo.length) {
      var slide = this.props.slideInfo[_currentSlide];
      // console.log(_currentSlide, '#/view/' + slide.id, context)
      return( '#/view/' + slide.id)
    }else{
      console.log('MainMenu: slide is less than 0')
    }
  }

  debugHelpers() {
    if(this.props.slideControls.debug){
      return(
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
          <span aria-label='Main Menu' role='img'>&#127968;</span> Main Menu
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href={this.assignURL(0, 'Fund')} onClick={() => this.handleLesson(0)}>
              <span aria-label='locked' role='img'>&#128274;</span> {this.props.slideControls.lessons[0].name}
            </DropdownItem>
            <DropdownItem href={this.assignURL(1, 'Joint Ops')} onClick={() => this.handleLesson(1)}>
              <span aria-label='unlocked' role='img'>&#128273;</span> {this.props.slideControls.lessons[1].name}
            </DropdownItem>
            <DropdownItem href={this.assignURL(2, 'C2')} onClick={() => this.handleLesson(2)}>
              <span aria-label='locked' role='img'>&#128274;</span> {this.props.slideControls.lessons[2].name}
            </DropdownItem>
            <DropdownItem href={this.assignURL(3, 'ISPR')} onClick={() => this.handleLesson(3)}>
              <span aria-label='locked' role='img'>&#128274;</span> {this.props.slideControls.lessons[3].name}
            </DropdownItem>

            <DropdownItem  divider />
            <DropdownItem href='/'>
              <span aria-label='reset' role='img'>&#9851;</span> Reset
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }
  }

  render() {
    return (  
     /*  <div>
        <div className="menuItems">
          <h6>Lesson: {this.props.slideControls.lessons[this.props.slideControls.currentLesson].name}</h6>
        </div>
        <div className="menuItems"> */
          <Navbar  color="faded" light expand="md">
          
            <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  
                  <Link className="linkAdj" to='/help'>
                    <span aria-label='Help' role='img'>&#9072; Help</span>
                  </Link>
                  
                  <NavItem>
                    <NavLink href={process.env.PUBLIC_URL + "/xtras/resources.html"} target="blank"><span aria-label='Resources' role='img'>&#128218;</span> Resources</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href={process.env.PUBLIC_URL + "/xtras/glossary.html"} target="blank">{/* String.fromCodePoint(0x1F50E) */}<span aria-label='Glossary' role='img'>&#128366;</span> Glossary</NavLink>
                  </NavItem>
                    
                    {this.debugHelpers()}
                  
                </Nav>
              </Collapse>
          </Navbar>
        /* </div>
      </div> */
    );
  }
}

