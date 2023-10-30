import { forwardRef } from "react"

export default forwardRef(({ error, label, id, options, ...rest }, ref) => {
    return (

        <div className="inputBox">
            <label className="label" htmlFor={id}>{label}</label>
            <select id={id} required ref={ref} {...rest}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error ? <p>{error.message}</p> : null}
        </div>
    );
})