import { useRecoilValue } from "recoil"
import Avatar from 'react-avatar';
import userAtom from "../store/atoms/Atoms"

const Appbar = () => {
    const user = useRecoilValue(userAtom);
  return (
    <nav className="p-4 flex items-center justify-between gap-2 bg-slate-400">
        <p className="text-4xl font-bold tracking-widest text-orange-900">FamPay</p>
        <Avatar
        name={user.userName}
        round={true}
        size={"50px"}
        color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])}
        />
    </nav>
  )
}

export default Appbar
