import React from "react";

const cardStyle = {
  padding: "10px 20px",
  margin: 10,
  backgroundColor: "#343434",
  borderRadius: "5px",
  color: "white",
  boxShadow: "4px 4px 3px rgba(0,0,0,.2)",
  cursor: "pointer",
};

const CategoryCard = React.forwardRef((props, ref) => {
  const { name } = props;

  return (
    <div {...props} ref={ref} style={cardStyle} className="category-card hover">
      <h2>{name}</h2>
    </div>
  );
});

export default CategoryCard;
