import { FiHome } from '@react-icons/all-files/fi/FiHome';
import { FiList } from '@react-icons/all-files/fi/FiList';
import { LinkItemProps, SideBarNavItem } from './SideBarNavItem';

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, url: '/' },
  { name: 'Concert List', icon: FiList, url: '/concerts' },
];

const CommonSideMenu = () => {
  return (
    <>
      {LinkItems.map(link => (
        <SideBarNavItem link={link} key={link.url} />
      ))}
    </>
  );
};

export default CommonSideMenu;
