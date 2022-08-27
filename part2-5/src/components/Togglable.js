import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(true);

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
            <button onClick={toggleVisibility}>{visible ? "cancel" : "show..."}</button>
            {visible && <div className="togglableContent">{props.children}</div>}
        </div>
    );
});

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
