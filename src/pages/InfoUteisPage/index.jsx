import { useState } from 'react'
import { AccordionItem } from '../../componets/AccordionItem'
import { CopyStatus, InfoContainer, LinkContainer, SubItem, SubItemContainer, SubTitle, Title } from './style'
import { FaChevronDown, FaChevronUp, FaDownload, FaLink } from 'react-icons/fa'

const InfoUteisPage = () => {
  const [copiedStatus, setCopiedStatus] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const centralizadorLink =
    'https://drive.usercontent.google.com/download?id=1hWLTnJOD8RCvNc4SJXbBB4MQrC3LPVn-&export=download&authuser=0'
  
  const virtualBoxLink = 'https://download.virtualbox.org/virtualbox/7.1.10/VirtualBox-7.1.10-169112-Win.exe'
  
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
          <SubItemContainer >
            {isOpen &&
            <LinkContainer>
              <p>Clique para copiar a URL de douload ou baixar o <pan style={{ color: 'var(--color-primary)' }}>centralizador</pan></p>
              <CopyStatus isVisible={copiedStatus}>Copiado</CopyStatus>
              <FaLink
                style={{ cursor: 'pointer', color: 'var(--color-primary)' }}
                onClick={() => handleCopyLink(centralizadorLink)}
              />
              <FaDownload onClick={() => handleDownloadLink(centralizadorLink)} style={{ cursor: 'pointer', color: 'var(--color-primary)' }}/>
            </LinkContainer>}
          </SubItemContainer>
          <SubItemContainer >
            {isOpen &&
            <LinkContainer>
              <p>Clique para copiar a URL de douload ou baixar o <pan style={{ color: 'var(--color-primary)' }}>Virtual Box</pan></p>
              <CopyStatus isVisible={copiedStatus}>Copiado</CopyStatus>
              <FaLink
                style={{ cursor: 'pointer', color: 'var(--color-primary)' }}
                onClick={() => handleCopyLink(virtualBoxLink)}
              />
              <FaDownload onClick={() => handleDownloadLink(virtualBoxLink)} style={{ cursor: 'pointer', color: 'var(--color-primary)' }}/>
            </LinkContainer>}
          </SubItemContainer>
        </div>
      </AccordionItem>

      
    </InfoContainer>
  )
}

export { InfoUteisPage }