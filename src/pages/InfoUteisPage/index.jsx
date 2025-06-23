import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa' 

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

const InfoUteisPage = () => {
  return (
    <InfoContainer>
      <Title>Informações Úteis</Title>

      <AccordionItem title="Suporte Técnico">
        <SubItem>Horário de Atendimento: 08:00 - 18:00 (Seg-Sex)</SubItem>
        <SubItem>Telefone de Contato: (XX) XXXX-XXXX</SubItem>
        <SubItem>Email para Suporte: suporte@empresa.com</SubItem>
      </AccordionItem>

      <AccordionItem title="Documentação Interna">
        <SubItem>Link para o Confluence: [Link Confluence]</SubItem>
        <SubItem>Guia de Onboarding para Novos Técnicos: [Link Guia]</SubItem>
        <SubItem>Procedimentos de Segurança: [Link Procedimentos]</SubItem>
      </AccordionItem>

      <AccordionItem title="Ferramentas Essenciais">
        <SubItem>VPN para Acesso Remoto: [Link Download]</SubItem>
        <SubItem>Software de Acesso Remoto (TeamViewer/AnyDesk): [Link Download]</SubItem>
        <SubItem>Sistema de Chamados (Jira/Zendesk): [Link Sistema]</SubItem>
      </AccordionItem>

      <AccordionItem title="Plantões e Escalas">
        <SubItem>Regras para Troca de Plantão: Consultar RH</SubItem>
        <SubItem>Escala de Finais de Semana: Disponível no Calendário</SubItem>
      </AccordionItem>
    </InfoContainer>
  )
}

export { InfoUteisPage }