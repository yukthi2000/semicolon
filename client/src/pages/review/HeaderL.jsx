import PropTypes from 'prop-types';
function HeaderL({ text, bgColor, textColor }) {
const headerStyles = {
  backgroundColor: bgColor,
  color: textColor
};
return (
<header style={headerStyles}>
    <div className="container">
    <h2>{text}</h2>
   </div>
 </header>
 );
}
HeaderL.defaultProps = {
  text: 'Share your exerience, Write a Review',
  bgColor: 'rgba(0,0,0,0.4)',
  textColor: '#ef7e2a'
};
HeaderL.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string
};
export default HeaderL;