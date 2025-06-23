import { AccordionItem } from '../../componets/AccordionItem'
import { InfoContainer, SubItem, Title } from './style'

const InfoUteisPage = () => {
  return (
    <InfoContainer>
      <Title>Informações Úteis</Title>

      <AccordionItem title="PDV Legal">
        <AccordionItem style={{ backgrongColor: "#c6c6c6" }} title="Link do centralizador">
        <SubItem><a 
        href="https://drive.usercontent.google.com/download?id=1hWLTnJOD8RCvNc4SJXbBB4MQrC3LPVn-&export=download&authuser=0" 
        target="_blank" 
        rel="noopener noreferrer"
        >
            <p>Link para baixar o centralizador</p>
        </a>
        </SubItem>

        </AccordionItem>
        
      </AccordionItem>

      
    </InfoContainer>
  )
}

export { InfoUteisPage }