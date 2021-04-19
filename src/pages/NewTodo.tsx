import React, {ChangeEvent, Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckIcon from '@material-ui/icons/Check';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import uniqueId from 'lodash/uniqueId';
import {actions as todoActions} from '../reducers/todo';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

interface MyProps {
    todoActions: any;
}

interface MyState {
    history: any;
}

class NewTodo extends Component<MyProps & MyState> {
    state = {
        form: {
            title: ''
        },
        backdropOpen: false,
        intervalId: 0
    }

    handleChange = (name: any) => (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            form: {
                ...this.state.form,
                [name]: event.target.value
            }
        })
    }

    handleSubmit = (event: ChangeEvent<HTMLFormElement> & any) => {
        event.preventDefault();
        const {form} = this.state;
        if (form.title.trim()) {
            const {todoActions} = this.props;
            const item = {
                id: uniqueId(),
                title: form.title.trim(),
                completed: false
            };
            todoActions.create(item);
            this.setState({form: {title: ''}});
            this.handleOpenBackdrop();
            let time = 1000;
            let intervalId = setInterval(() => {
                this.handleCloseBackdrop();
                this.handleBack();
            }, time);
            this.setState({intervalId: intervalId});
        }
    }

    handleBack = () => {
        const {history} = this.props;
        history.push('/');
    }

    handleOpenBackdrop = () => {
        this.setState({backdropOpen: true});
    }

    handleCloseBackdrop = () => {
        this.setState({backdropOpen: false});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        const {form} = this.state;
        return (
            <Grid item xs={12} sm={6}>
                <Typography variant={"h4"} align="center">New todo</Typography>
                <Paper style={{paddingLeft: 16, paddingRight: 16}}>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            id="todo"
                            label="What needs to be done?"
                            onChange={this.handleChange('title')}
                            fullWidth
                            margin="normal"
                            value={form.title}
                            autoComplete="off"
                            autoFocus={true}
                            InputProps={{
                                endAdornment:
                                    (<InputAdornment position="end">
                                        <IconButton
                                            onClick={this.handleSubmit}

                                        >
                                            <CheckIcon/>
                                        </IconButton>
                                    </InputAdornment>)

                            }}
                        />
                    </form>
                    <IconButton aria-label="Back" onClick={this.handleBack}>
                        <ArrowBackIcon/>
                    </IconButton>
                </Paper>
                <Backdrop style={{color: '#fff', zIndex: 9999}} open={this.state.backdropOpen}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </Grid>
        );
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({todoActions: bindActionCreators(todoActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodo);