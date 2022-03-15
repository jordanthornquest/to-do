// Import Next Image component
import Image from "next/image";

// Import image
import logo from "../../public/krs-logo.webp";

export function Header() {
  return (
    <>
      <Image alt="The KRS logo" height={35} src={logo} width={107} />
      <h1 className="fs-4 d-none d-sm-block mb-0">Global Domination Planner</h1>
    </>
  );
}
