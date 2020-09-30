import React from "react";
import PropTypes from 'prop-types';
import classes from "./Input.module.scss";

const Input = React.forwardRef(({ labelText, id, onChange, ...props }, ref) => (
    <>
        <label 
            className={classes.label}
            htmlFor={id}
            aria-labelledby={labelText}
        >
          {labelText}
        </label>
      <div>
        <input
          className={classes.input}
          id={id}
          ref={ref}
          onChange={onChange}
          {...props}
        />
      </div>
    </>
    )
)
export default Input;

Input.propTypes = {
    labelText: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    ref: PropTypes.shape({ 
        current: PropTypes.instanceOf(HTMLInputElement) 
    })
}