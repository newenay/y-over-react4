import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

function mapStateToProps(state) {
    return{
        slideInfo: state.slideInfo,
        slideBullets: state.slideBullets,
        examQuestions: state.examQuestions,
        slideControls: state.slideControls
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);   
}

// [HOC] High-Order Component -- sadds all actions, dispatch, and then calls Main to initialize
const App = connect( mapStateToProps, mapDispatchToProps )(Main);

export default App;

