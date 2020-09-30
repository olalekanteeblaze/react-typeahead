import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import classes from './TypeAhead.module.scss';

const TypeAhead = ({ colorsList }) => {

    const [inputValue, setInputValue] = useState("")
    const [colors, setColors] = useState(colorsList)
    const [focusedColor, setFocusedColor] = useState('')
    const [showList, setShowList] = useState(false)
    const inputRef = useRef(null)
    const containerRef = useRef(null)

    const handleChange = (e) => {
        setInputValue(e.target.value)
        setShowList(true)
    }

    const handleListClick = (color) => {
        closeList()
        setInputValue(color)
        inputRef.current.focus()
    }

    const handleListFocus = (color) => {
        setFocusedColor(color)
    }

    const closeList = () => {
        setShowList(false)
    }

    useEffect(() => {
        if(inputValue){
            setColors(
                colorsList.filter(
                    colors => colors.toLowerCase().startsWith(inputValue.toLowerCase())
            ));
        } else {
            closeList()
        }
    },[inputValue])


    useEffect(() => {

        const handleKeyPress = (e) => {
            switch(e.keyCode){
                case 13:
                    setInputValue(focusedColor)
                    closeList()
                    inputRef.current.focus()
                    break;
                case 27:
                    closeList()
                    inputRef.current.focus()
            }
        }

        const handleOutsideClick = (e) => {
            if(containerRef.current && !containerRef.current.contains(e.target)){
                setShowList(false)
            }
        }
        document.addEventListener("keydown", handleKeyPress)
        document.addEventListener("click", handleOutsideClick)
        return(() => {
            document.removeEventListener("keydown", handleKeyPress)
        })
    })
    return (
        <div 
            className={classes.container}
            ref={containerRef}
        >
            <Input 
                labelText="Enter a Color"
                onChange={handleChange}
                value={inputValue}
                ref={inputRef}
                placeholder="AliceBlue"
                id="color"
            />
            {showList &&
                <div 
                    className={classes.list__wrapper}
                >
                    <ul>
                        {colors.map((color, index)=> (
                            <li 
                                tabIndex="0"
                                onClick={() => handleListClick(color)}
                                onFocus={() => handleListFocus(color)}
                                key={index}
                            >
                                {color.split("").map((letter, index) => (
                                    <span 
                                        className={inputValue.includes(letter) && 
                                                    color[index] === inputValue[index] ?
                                                    classes.bold : ''
                                        }>
                                            {letter}
                                    </span>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}
export default TypeAhead;
TypeAhead.propTypes = {
    colorsList: PropTypes.arrayOf(PropTypes.string)
}