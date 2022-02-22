const ColorMap = ({ bgColor = "0,0,0", onClick, showBorder=false }) => {
  return (
    <div onClick={onClick} className="colorMap" style={{
      backgroundColor: `#${bgColor}`, 
      border: showBorder? "3px solid #fff" : "",
      opacity: showBorder? "50%" : "100%",
  }}></div>
  );
};

export default ColorMap;
