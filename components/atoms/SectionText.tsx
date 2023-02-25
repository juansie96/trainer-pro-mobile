import React from "react";
import TPText from "./TPText";

const SectionText = ({ children, ...props }: { children: React.ReactNode }) => (
  <TPText my={25} fs={32} type="black">
    {children}
  </TPText>
);

export default SectionText;
