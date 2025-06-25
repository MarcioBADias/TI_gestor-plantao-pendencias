import { useState } from 'react'
import { AccordionItem } from '../../componets/AccordionItem'
import {  InfoContainer,  SubItem, SubTitle, Title } from './style'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { AccordionSubItem } from '../../componets/AccordionSubItem'
import { utilityLinks } from '../../Utils/utilityLinks'

const InfoUteisPage = () => {
  const [copiedStatus, setCopiedStatus] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleCopyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link)
      setCopiedStatus(true)
      setTimeout(() => {
        setCopiedStatus(false)
      }, 2000)
    } catch (err) {
      console.error('Falha ao copiar o link: ', err)
    }
  }

  const handleDownloadLink = (link) => {
    window.open(link, '_blank')
  }

  return (
    <InfoContainer>
      <Title>Informações Úteis</Title>

      <AccordionItem title="PDV Legal">
        <div>
          <SubItem
            onClick={toggleOpen}
          >
            <SubTitle>Centralizador</SubTitle>
        {isOpen ? <FaChevronUp style={{ color: 'var(--color-primary)' }} /> : <FaChevronDown style={{ color: 'var(--color-primary)' }} />}
          </SubItem>
          {
            utilityLinks.map(info =>
              <AccordionSubItem key={info.id} text={info.text} isOpen={isOpen} isCopiedStatus={copiedStatus} urLink={info.link} onHandleCopyLink={handleCopyLink} onHandleDownloadLink={handleDownloadLink} />
            )
          }
        </div>
      </AccordionItem>

      
    </InfoContainer>
  )
}

export { InfoUteisPage }