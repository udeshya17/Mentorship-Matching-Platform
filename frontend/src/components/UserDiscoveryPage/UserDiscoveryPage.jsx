import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../Card/userCard"; // Ensure this component exists
import { Row, Col, Button, Container, Dropdown, Badge } from "react-bootstrap";
import { config } from "../../App";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const UserDiscoveryPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [filters, setFilters] = useState({ role: "", skills: "", interests: "" });

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${config.endpoint}/api/profile/users`);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
          setFilteredUsers(response.data);
        } else {
          console.error("Received data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...users];

      if (filters.role) {
        filtered = filtered.filter((user) => user.role === filters.role);
      }

      if (filters.skills) {
        filtered = filtered.filter((user) => user.skills.includes(filters.skills));
      }

      if (filters.interests) {
        filtered = filtered.filter((user) => user.interests.includes(filters.interests));
      }

      setFilteredUsers(filtered);
    };

    applyFilters();
  }, [filters, users]);

  const removeFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: "" }));
  };

  return (
    <Container>
      <h1 className="text-center my-4">User Discovery</h1>

      <div className="mb-4">
        <h5>Filters</h5>
        <div className="d-flex gap-3">
          <Dropdown onSelect={(value) => handleFilterChange("role", value)}>
            <Dropdown.Toggle variant="primary" id="dropdown-role">
              Role
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="mentor">Mentor</Dropdown.Item>
              <Dropdown.Item eventKey="mentee">Mentee</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown onSelect={(value) => handleFilterChange("skills", value)}>
            <Dropdown.Toggle variant="primary" id="dropdown-skills">
              Skills
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="JavaScript">JavaScript</Dropdown.Item>
              <Dropdown.Item eventKey="React">React</Dropdown.Item>
              <Dropdown.Item eventKey="CSS">CSS</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown onSelect={(value) => handleFilterChange("interests", value)}>
            <Dropdown.Toggle variant="primary" id="dropdown-interests">
              Interests
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="Coding">Coding</Dropdown.Item>
              <Dropdown.Item eventKey="Design">Design</Dropdown.Item>
              <Dropdown.Item eventKey="Music">Music</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="mt-3">
          {Object.entries(filters).map(
            ([key, value]) =>
              value && (
                <Badge
                  key={key}
                  pill
                  bg="secondary"
                  className="me-2"
                  onClick={() => removeFilter(key)}
                  style={{ cursor: "pointer" }}
                >
                  {`${key}: ${value}`} <span>&times;</span>
                </Badge>
              )
          )}
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <>
          {!showMore ? (
            <Carousel responsive={responsive} infinite>
              {filteredUsers.map((user) => (
                <div key={user._id} style={{ padding: "0 10px" }}>
                  <UserCard user={user} />
                </div>
              ))}
            </Carousel>
          ) : (
            <Row className="g-4" style={{ padding: "20px 0" }}>
              {filteredUsers.map((user) => (
                <Col key={user._id} sm={12} md={6} lg={4} xl={3}>
                  <UserCard user={user} />
                </Col>
              ))}
            </Row>
          )}

          <div className="text-center mt-4">
            <Button onClick={() => setShowMore(!showMore)}>
              {showMore ? "Collapse" : "Show More"}
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center">No users available</p>
      )}
    </Container>
  );
};

export default UserDiscoveryPage;
