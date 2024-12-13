import { Card } from "react-bootstrap";
import "./userCard.css"; 
import userImage from "../../assets/user.webp"


const UserCard = ({ user }) => {
  return (
    <Card className="user-card">
      <Card.Img variant="top" src={userImage} alt={`${user.name}'s profile`} />
      <Card.Body>
        <Card.Title className="user-name">{user.name}</Card.Title>
        <Card.Subtitle className="user-role">{user.role}</Card.Subtitle>
        <Card.Text className="user-bio">{user.bio}</Card.Text>
        <div className="user-skills">
          <strong>Skills: </strong>{user.skills.join(", ")}
        </div>
        <div className="user-interests">
          <strong>Interests: </strong>{user.interests.join(", ")}
        </div>
      </Card.Body>
      <Card.Footer className="user-footer">
        <button className="view-profile-btn">View Profile</button>
      </Card.Footer>
    </Card>
  );
};

export default UserCard;
