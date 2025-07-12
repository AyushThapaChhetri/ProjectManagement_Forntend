import { Input, InputGroup, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

interface InputWithKbdProps {
  width: string;
  // value?: string;
  placeholder: string;
  value: string;
  // onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const InputWithKbd = ({
  width = "auto",
  placeholder,
  onChange,
  value,
}: InputWithKbdProps) => (
  <InputGroup startElement={<LuSearch />} endElement={<Kbd>⌘K</Kbd>} w={width}>
    <Input placeholder={placeholder} value={value} onChange={onChange} />
  </InputGroup>
);
