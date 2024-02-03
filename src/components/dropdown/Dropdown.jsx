
import styles from "./Dropdown.module.css"

const Dropdown = ({name,options,OnSelect, disabled}) =>{

    return(
        
        <select className={styles.container} name={name} id={name} onChange={OnSelect} disabled={disabled}>
            <option>Select {name}</option>
            { options.map((val) => (
                    <option key={val} value={val}>{val}</option>
                ))
            }
        </select>
        
            
        
    )
}

export default Dropdown;