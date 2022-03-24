import './Footer.scss';

export default function Footer({ posterURL, title }) {
	return (
		<footer>
			<img src={posterURL} />
			<h3>{title}</h3>
		</footer>
	);
}
