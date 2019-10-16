import { connect } from "react-redux";
import SlideControls from "./SlideControls";

// Map Redux state to Component props
function mapStateToProps(state) {
    return {
        //value of currentFrame state
        countValue: state.count
    }
}

// Actions
var increaseAction = { type:"increaseSlide" };
var decreaseAction = { type:"decreaseSlide" };

// Map Redux action to Component props
function mapDispatchToProps(dispatch) {
    return {
        //maps to Component buttons
        increaseCount: function() {
            return dispatch(increaseAction);
        },
       decreaseCount: function() {
            return dispatch(decreaseAction);
        }
    }
}

// The HOC (Higher Order Component)
var connectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(SlideControls);

export default connectedComponent;