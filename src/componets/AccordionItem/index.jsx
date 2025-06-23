import React, { useState } from "react";
import { AccordionContent, AccordionHeader, AccordionWrapper } from "./style";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <AccordionWrapper>
      <AccordionHeader onClick={toggleOpen}>
        {title}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </AccordionHeader>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </AccordionWrapper>
  )
}

export { AccordionItem }