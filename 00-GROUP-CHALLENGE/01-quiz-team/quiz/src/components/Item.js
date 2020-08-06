import React from "react";
import { NavLink } from 'react-router-dom';
import './../css/Item.css'

function Item(props) {
    return (
        <>
            <NavLink activeClassName="my-active-class" to={`themes/${props.themeSlug}`} >
                <div className="item__container">
                    <img className="img__item" src={props.themeImgurl} alt="item theme"></img>
                    <h2 className="img__title">{props.themeTitle}</h2>
                </div>
            </NavLink>
        </>
    )
}

export default Item;