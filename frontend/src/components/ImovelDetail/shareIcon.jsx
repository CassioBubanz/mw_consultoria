import React from "react"
import { toast } from "react-toastify";
import { FaShareAlt } from "react-icons/fa"

const ShareIcon = ({link}) => {
    const copyLink = () => { 
    
        navigator.clipboard.writeText(link).then(() => {

        
            toast.success( "Link copiado com sucesso!");
        })
        .catch(() => {
            toast.error("Falha ao copiar o link. Tente novamente.")
        });
    };
    return ( 
        <button onClick={copyLink}
        style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#555",
            fontSize: "20px",
            marginLeft: "10px",
            marginTop: "5px",
        }}
        aria-label="Compartilhar"
        title="Compartilhar">
            <FaShareAlt />
        </button>
    )
}
export default ShareIcon;