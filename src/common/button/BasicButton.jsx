import "../../styless/components/BasicButton.css";

const BasicButton = ({
                       children,
                       onClick,
                       type = "button",
                       size = "medium",
                       className = "",
                       style = {}
                     }) => {
  const buttonClass = `basic-button basic-button--${size} ${className}`;

  return (
      <button
          type={type}
          className={buttonClass}
          onClick={onClick}
          style={style}
      >
        {children}
      </button>
  );
};

export default BasicButton;
