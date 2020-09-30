import React from "react";
import classes from "./Input.module.scss";

const Input = React.forwardRef(({ labelText, id, ...props }, ref) => (
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
          {...props}
        />
      </div>
    </>
    )
)
export default Input;