import { useContext } from 'react';
import { IoMdMoon as Moon, IoMdSunny as Sun } from 'react-icons/io';
import ThemeContext from '../../context/ThemeContext';
import './ThemeSwitch.scss';

export default function ThemeSwitch() {
	const { dark, toggle } = useContext(ThemeContext);

	return (
		<button className="Switch" onClick={toggle}>
			<Sun className={`icon ${dark ? 'inactive' : 'sunActive'}`} />
			<Moon className={`icon ${dark ? 'moonActive' : 'inactive'}`} />
		</button>
	);
}
