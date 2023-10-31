import { signOut } from "firebase/auth"
import { Avatar, AvatarFallback } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { auth } from "../lib/firebase"
import { useNavigate } from "react-router-dom"

export default function ProfileDropdown() {
  const navigate = useNavigate()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>
            {auth.currentUser?.displayName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button
            onClick={() => {
              signOut(auth)
                .then(() => {
                  navigate("/login")
                })
                .catch((error) => {
                  console.log(error)
                })
            }}
            className=""
          >
            Signout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
