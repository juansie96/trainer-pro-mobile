import React from "react";
import TPText from "./TPText";

const SectionText = ({ children }: { children: React.ReactNode }) => (
  <TPText my={25} fs={32} fw={600}>
    {children}
  </TPText>
);

export default SectionText;
