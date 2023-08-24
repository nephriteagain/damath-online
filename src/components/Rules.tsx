"use client"
import Link from 'next/link'

import { useRef, useEffect, Dispatch, SetStateAction, MouseEvent } from 'react'
import { CgCloseR } from 'react-icons/cg'

import { RULES } from '@/lib/RULES'

import { Button } from "@/components/ui/button"

interface RuleProps {
  openRules: boolean;
  setOpenRules: Dispatch<SetStateAction<boolean>>
}

function Rules({ setOpenRules, openRules }: RuleProps) {

  const popupRef = useRef<HTMLDivElement>(null)

  function closeRuleSheet() {
    setOpenRules(false)
  }

  useEffect(() => {
    let x = 0
    let y = 0

    const el = popupRef.current as HTMLDivElement
    // @ts-ignore
    const mouseDownHandler = function (e) {
    // Get the current mouse position
    x = e.clientX;
    y = e.clientY;

    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    };
    // @ts-ignore
    const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - x;
    const dy = e.clientY - y;
    
    // Set the position of element
    el.style.top = `${el.offsetTop + dy}px`;
    el.style.left = `${el.offsetLeft + dx}px`;

    // Reassign the position of mouse
    x = e.clientX;
    y = e.clientY;
    };

    const mouseUpHandler = function () {
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

    el.addEventListener('mousedown', mouseDownHandler);

    return () => {
        removeEventListener('mousemove', mouseMoveHandler)
        removeEventListener('mouseup', mouseUpHandler)
        removeEventListener('mousedown', mouseDownHandler)
    }

  }, [openRules])

  return (
    <div className="rule-popup z-[20] p-[1rem] absolute w-[500px] h-[75vh] overflow-auto  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-xl drop-shadow-lg rounded-lg"  
      ref={popupRef}
    >
        <div className='mb-8'>
            <h2 className='text-2xl font-bold'>
            DAMATH
            </h2>
            <h3 className='text-lg font-semibold opacity-60'>
            Rules of Play
            </h3>
        </div>
        <span className='absolute top-4 right-4 text-xl cursor-pointer hover:text-red-800 hover:scale-125 transition-all duration-150'
            onClick={closeRuleSheet}
        >
            <CgCloseR />
        </span>
        <ol className="text-justify px-3 text-sm" type='1'>
            {RULES.map((rule,index) => {
            return (
                <li key={index} className='mb-4'>
                  {index+1}. {rule}
                </li>
            )
            })}
        </ol>
        <br/>
        <br/>
        <Button variant='link' className='italic'>
            <Link href="https://depedbohol.org/v2/wp-content/uploads/2014/09/Rules-of-Damath.pdf" target='_blank'>
                Rules was sourced here.
            </Link>
        </Button>
      
    </div>
  )
}

export default Rules