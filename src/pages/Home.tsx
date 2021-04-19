import React, {ChangeEvent, Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {FormControl, ListItem, ListItemSecondaryAction, ListItemText, MenuItem} from '@material-ui/core';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as todoActions} from '../reducers/todo';
import {actions as loadingActions} from '../reducers/loading';

interface MyProps {
    todoActions: any;
    todo: any;
    loadingActions: any;
}

interface MyState {
    history: any;
}

class Home extends Component<MyProps & MyState> {
    state = {
        filter: 'all',
        open: false,
        value: {
            id: 0,
            title: '',
            completed: false
        },
        intervalId: 0
    }

    handleChangeFilter = (event: ChangeEvent<HTMLSelectElement & any>) => {
        this.setState({filter: event.target.value});
    }

    handleToggleCompleted = (value: any) => (event: any) => {
        const {todoActions} = this.props;
        const item = {
            ...value,
            completed: !value.completed
        }
        todoActions.update(item);
    }

    handleNew = () => {
        const {history} = this.props;
        history.push('/new');
    }

    handleEdit = (value: any) => (event: any) => {
        const {history} = this.props;
        history.push(`/edit/${value.id}`);
    }

    handleDelete = (value: any) => (event: any) => {
        const {loadingActions} = this.props;
        const {todoActions} = this.props;
        loadingActions.open(true);
        //todoActions.delete(value);
        this.closeDeleteDialog();

        // close backdrop
        let time = 1000;
        let intervalId = setInterval(() => {
            clearInterval(this.state.intervalId);
            todoActions.delete(value);
            loadingActions.close(false);
        }, time);
        this.setState({intervalId: intervalId});
    }

    filterTodoItems = (item: any) => {
        const {filter} = this.state;
        if (filter === 'completed') {
            return item.completed;
        }
        if (filter === 'active') {
            return !item.completed;
        }
        return true;
    }

    openDeleteDialog = (value: any) => (event: any) => {
        this.setState({
            value: value,
            open: true
        });
    }

    closeDeleteDialog = () => {
        this.setState({open: false});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        const {todo} = this.props;
        const {filter} = this.state;

        return (
            <Grid item xs={12} sm={6}>
                <Typography variant={"h4"} align="center">Todos</Typography>
                <Paper style={{paddingLeft: 16, paddingRight: 16}}>
                    <Button style={{marginTop: 16}} variant="contained" color="primary" onClick={this.handleNew}>
                        <AddIcon/> Add new todo
                    </Button>
                    {todo.items.length ?
                        <FormControl fullWidth style={{marginTop: 16}}>
                            <Select
                                value={filter}
                                onChange={this.handleChangeFilter}
                                name="filter"
                                fullWidth
                            >
                                <MenuItem value='all'>All</MenuItem>
                                <MenuItem value='completed'>Completed</MenuItem>
                                <MenuItem value='active'>Active</MenuItem>
                            </Select>

                        </FormControl>
                        :
                        <Typography align="center" style={{marginTop: 16}}>The todo list is empty.</Typography>
                    }
                    <List>
                        {todo.items.filter(this.filterTodoItems).map((value: any) => (
                            <ListItem
                                key={value.id}
                                dense
                                button
                                onClick={this.handleToggleCompleted(value)}
                            >
                                <Checkbox
                                    checked={value.completed}
                                    tabIndex={-1}
                                    disableRipple
                                />
                                <ListItemText primary={value.title}/>
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Edit" onClick={this.handleEdit(value)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton aria-label="Delete" onClick={this.openDeleteDialog(value)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth="xs"
                    fullWidth={true}
                    aria-labelledby="confirmation-dialog-title"
                    open={this.state.open}
                >
                    <DialogTitle id="confirmation-dialog-title">Confirm delete to-do</DialogTitle>
                    <DialogContent dividers>
                        <Typography align="center">Delete {this.state.value.title}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.closeDeleteDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDelete(this.state.value)} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        );
    }
}

const mapStateToProps = ({todo}: any) => ({todo});
const mapDispatchToProps = (dispatch: any) => ({
    todoActions: bindActionCreators(todoActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);