import "./buttons.styles.css"

export default function Buttons ({textButton, type,onClick}){
return(
    <div>
    <button className="buttons" type={type} onClick={onClick}>{textButton}</button>
    </div>
)
}