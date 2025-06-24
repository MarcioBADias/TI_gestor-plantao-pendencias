import { useState } from 'react'
import { AccordionItem } from '../../componets/AccordionItem'
import { InfoContainer, SubItem, Title } from './style'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const InfoUteisPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  
    const toggleOpen = () => {
      setIsOpen(!isOpen)
    }
  return (
    <InfoContainer>
      <Title>Informações Úteis</Title>

      <AccordionItem title="PDV Legal">
        <div>
          <SubItem onClick={toggleOpen} style={{ display: 'flex', justifyContent: 'space-between' }} > 
        <p>
          Centralizador
        </p>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </SubItem>
          {isOpen &&  
          <div>
          <p>Link para baixar o centralizador</p>
          <p>
            "https://drive.usercontent.google.com/download?id=1hWLTnJOD8RCvNc4SJXbBB4MQrC3LPVn-&export=download&authuser=0"
          </p>
          </div>
}
           </div>

        
        
      </AccordionItem>

      
    </InfoContainer>
  )
}

export { InfoUteisPage }