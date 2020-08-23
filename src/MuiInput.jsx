import { Component, Fragment, createElement } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import "./ui/MuiInput.css";

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    label: {
        fontSize: "1.5rem",
        top: -3
    },
    helperText: {
        fontSize: "1rem"
    },
    errorHelperText: {
        fontSize: "1rem",
        color: "red"
    }
});

class MuiInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event) {
        const { attribute, onChange } = this.props;

        attribute.setTextValue(event.target.value);

        if (onChange) {
            if (onChange.canExecute) {
                onChange.execute();
            }
        }
    }

    handleKeyPress(event) {
        const { onEnter } = this.props;
        if (onEnter) {
            if (event.which === 13 && onEnter.canExecute) {
                onEnter.execute();
            }
        }
    }

    render() {
        const { classes, attribute, label, helperText, name } = this.props;

        return (
            <Fragment>
                <div className={`${this.props.class}`}>
                    <TextField
                        id={name}
                        type={attribute.formatter.type === "number" ? "number" : "text"}
                        fullWidth
                        label={label.value}
                        className={classes.textField}
                        value={attribute.displayValue}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        margin="normal"
                        helperText={attribute.validation ? attribute.validation : helperText.value}
                        disabled={attribute.readOnly}
                        error={attribute.validation}
                        InputLabelProps={{
                            className: classes.label
                        }}
                        FormHelperTextProps={{
                            className: attribute.validation ? classes.errorHelperText : classes.helperText
                        }}
                    />
                </div>
            </Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MuiInput);
