import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, handleReset}, ref){
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime/1000).toFixed(2);
    const score = ((1-formattedRemainingTime/targetTime).toFixed(2))*100;
    useImperativeHandle(ref, () => {
        return {
            open(){
                dialog.current.showModal();
            }
        }
    })
  return createPortal(
    <dialog ref={dialog} className='result-modal'>
        {userLost && <h2>You Lost!</h2>}
        {!userLost && <h2>Your Score: {score}</h2>}
        <p>The target time was <strong>{targetTime} seconds</strong></p>
        <p>You stopped the timer with <strong>{formattedRemainingTime}</strong></p>
        <form method="dialog" onSubmit={handleReset}>
            <button>Close</button>
        </form>
    </dialog>,
    document.getElementById("modal")
  )
})

export default ResultModal;