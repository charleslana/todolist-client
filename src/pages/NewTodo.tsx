import React, {ChangeEvent, Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckIcon from '@material-ui/icons/Check';
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
        }
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
            this.handleBack();
        }
    }

    handleBack = () => {
        const {history} = this.props;
        history.push('/');
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
            </Grid>
        );
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({todoActions: bindActionCreators(todoActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodo);