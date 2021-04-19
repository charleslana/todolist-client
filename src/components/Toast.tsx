import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions as toastActions} from '../reducers/toast';

interface MyProps {
    toastActions: any;
    toast: any;
}

interface MyState {
}

class Toast extends Component<MyProps & MyState> {

    handleClose = () => {
        const {toastActions} = this.props;
        toastActions.close(false);
    }

    render() {
        const {toast} = this.props;
        console.log(toast);
        return (
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={toast.toast}
                autoHideDuration={6000}
                onClose={this.handleClose}
            >
                <Alert elevation={6} severity="success" variant={"filled"} onClose={this.handleClose}>
                    This is a success message!
                </Alert>
            </Snackbar>
        );
    }
}

const mapStateToProps = ({toast}: any) => ({toast});
const mapDispatchToProps = (dispatch: any) => ({toastActions: bindActionCreators(toastActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);