const Button = ({handleClick, content}) => {
    return (
        <button onClick={handleClick}>{content}</button>
    )
};

export default Button;