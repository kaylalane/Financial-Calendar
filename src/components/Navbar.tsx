import { auth } from "../lib/firebase"
import AddDeposit from "./AddDeposit"
import ProfileDropdown from "./ProfileDropdown"

const Navbar = () => {
  return (
    <nav className=" p-4">
      <ProfileDropdown />
    </nav>
  )
}

export default Navbar
