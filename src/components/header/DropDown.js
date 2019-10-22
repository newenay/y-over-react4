import React, { PureComponent } from 'react';
import './DropDown.css';

// github.com/dbilgili/Custom-ReactJS-Dropdown-Components/blob/master/scr
class DropDown extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      headerTitle: this.props.title
    }

    this.close = this.close.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  // Closes DropDown when Click outside the menu
  componentDidUpdate() {
    const {isOpen} = this.state
    setTimeout(() => {
      if(isOpen) {
        window.addEventListener('click', this.close)
      }else{
        window.removeEventListener('click', this.close)
      }
    }, 0)
  }
  
  componentWillUnmount() {
    window.removeEventListener('click', this.close)
  }

  close(timeout) {
    this.setState({
      isOpen: false
    })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  itemSelected(_lesson) {
    this.setState({
        isOpen: !this.state.isOpen,
        headerTitle: _lesson.name
    });
    
    this.props.handleLesson(_lesson.id)
  }

  render() {
      const{list} = this.props
      const{isOpen, headerTitle} = this.state

    return ( 
        <div className='dd-wrapper-single'>
          <div className='dd-header' onClick={() => this.toggle()}>
            <div className='dd-header-title'>{headerTitle}
                {isOpen
                    ? <span aria-label='up' role='img'>&#11205;</span>
                    : <span aria-label='down' role='img'>&#11206;</span>
                }
            </div>
          </div>  
          {isOpen && <ul className='dd-list' style={{listStyleType: 'none'}} >
              {list.map((item) =>(
                <li className='dd-list-item' key={item.id} onClick={() => this.itemSelected(item)}><span aria-label='locked' role='img'>&#128274;</span>&nbsp;{item.name}</li>                  
              ))}

              {/* <li className='dd-list-item' href={this.assignURL(0, 'Fund')} onClick={() => this.handleLesson(0)} >
                <span aria-label='locked' role='img'>&#128274;</span> {this.props.slideControls.lessons[0].name}
              </li>
              <li className='dd-list-item' href={this.assignURL(1, 'Joint Ops')} onClick={() => this.handleLesson(1)} >
                <span aria-label='unlocked' role='img'>&#128273;</span> {this.props.slideControls.lessons[1].name}
              </li>*/}

          </ul>}
        </div>
    );
  }
}

export default DropDown

