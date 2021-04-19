import React, {Component} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions as loadingActions} from '../reducers/loading';

interface MyProps {
    loadingActions: any;
    loading: any;
}

interface MyState {
}

class Loading extends Component<MyProps & MyState> {

    render() {
        const {loading} = this.props;
        return (
            <Backdrop style={{color: '#fff', zIndex: 9999}} open={loading.loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        );
    }
}

const mapStateToProps = ({loading}: any) => ({loading});
const mapDispatchToProps = (dispatch: any) => ({loadingActions: bindActionCreators(loadingActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);