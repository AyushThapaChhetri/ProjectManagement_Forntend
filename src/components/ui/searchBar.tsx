import { Input, InputGroup, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

interface InputWithKbdProps {
  width: string;
}

export const InputWithKbd = ({ width }: InputWithKbdProps) => (
  <InputGroup startElement={<LuSearch />} endElement={<Kbd>⌘K</Kbd>} w={width}>
    <Input placeholder="Search contacts" />
  </InputGroup>
);
