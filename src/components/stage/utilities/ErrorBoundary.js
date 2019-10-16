import React from 'react'
// https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
  
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({ 
        error: error,
        errorInfo: errorInfo
       })
      // You can also log the error to an error reporting service here
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.errorInfo) {
        // Error path
        return (
          <div>
            <h6>Something went wrong.</h6>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              { this.state.error && this.state.error.toString() }
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }
      // Normally, just render children
      return this.props.children;
    }
  }

  export default ErrorBoundary