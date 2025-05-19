const Button = ({ children, onClick, disabled = false }) => {
  return (
    <button
      className={`p-2 rounded-md block ${!disabled ? "bg-blue-500 hover:bg-blue-400 text-white" : "bg-slate-300 text-white hover:cursor-not-allowed"}`}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
