import { Button } from "react-bootstrap";

const ActionButton = ({
                          onClick,
                          disabled = false,
                          children,
                          variant = "primary",
                          className = "w-100 py-3 rounded-pill fw-bold",
                          style = {}
                      }) => {
    const defaultStyle = {
        fontSize: '16px',
        backgroundColor: disabled ? '#6c757d' : undefined,
        ...style
    };

    return (
        <Button
            variant={variant}
            className={className}
            onClick={onClick}
            disabled={disabled}
            style={defaultStyle}
        >
            {children}
        </Button>
    );
};

export default ActionButton;