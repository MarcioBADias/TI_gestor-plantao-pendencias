import { CopyStatus, LinkContainer, SubItemContainer } from "./style"
import { FaDownload, FaLink } from "react-icons/fa"

const AccordionSubItem = ({ text, isOpen, isCopiedStatus, urLink, onHandleCopyLink, onHandleDownloadLink }) => (
    <SubItemContainer >
    {isOpen &&
    <LinkContainer>
        <p>{text}</p>
        <CopyStatus isVisible={isCopiedStatus}>Copiado</CopyStatus>
        <FaLink
        style={{ cursor: 'pointer', color: 'var(--color-primary)' }}
        onClick={() => onHandleCopyLink(urLink)}
        />
        <FaDownload onClick={() => onHandleDownloadLink(urLink)} style={{ cursor: 'pointer', color: 'var(--color-primary)' }}/>
        </LinkContainer>}
    </SubItemContainer>
)

export { AccordionSubItem }
