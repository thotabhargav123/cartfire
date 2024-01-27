import React from 'react'

export const InputArea = ({Handlechange, HandleAddItem, item}) => {
    return (
        <>
            <form>
                <input type="text" name="" id="" onChange={Handlechange} value={item}/>
                <button onClick={HandleAddItem}>Add to cart</button>
            </form>
        </>
    )
}
