import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        };
    });

    return (
        <div>
            {props.header && props.header}{" "}
            <button onClick={toggleVisibility}>{visible ? "close" : props.buttonLabel}</button>
            {visible && props.children}
        </div>
    );
});

export default Togglable;
