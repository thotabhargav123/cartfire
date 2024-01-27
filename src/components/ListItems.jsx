import React from 'react'

export const ListItems = ({items, handleComplete, handleDelete}) => {
  return (
    <>
      <li className={`todo ${items[1].isPurchased ? "completed" : ""}`} onClick={()=>{handleComplete(items[0], items[1].isPurchased)}} onDoubleClick={(e)=>{handleDelete(e,items[0])}} > 
        {items[1].item}
      </li>
    </>
  )
}
