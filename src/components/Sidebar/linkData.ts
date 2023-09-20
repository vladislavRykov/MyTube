import { AiFillHome } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { MdSubscriptions, MdVideoLibrary } from 'react-icons/md';
import { GoHistory } from 'react-icons/go';
const LinkData = [
  {
    href: '/',
    title: 'Home',
    Picture: AiFillHome,
  },
  {
    href: '/shorts',
    title: 'Shorts',
    Picture: BsFillTrashFill,
  },
  {
    href: '/subscribs',
    title: 'Подписки',
    Picture: MdSubscriptions,
  },
  {
    href: '/library',
    title: 'Библиотека',
    Picture: MdVideoLibrary,
  },
  {
    href: '/history',
    title: 'История',
    Picture: GoHistory,
  },
];

export default LinkData;
