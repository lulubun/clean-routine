import { Pencil } from 'lucide-react';
import { PeachButton } from "../styled-components";

const EditButton = ({ onClick }) => {
  return (
    <PeachButton onClick={onClick} style={{borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Pencil style={{maxWidth: "1em", maxHeight: "1.5em"}} />
    </PeachButton>
  );
};

export default EditButton;