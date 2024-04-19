import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Navbar from "../Comman/Navbar";
import Modal from 'react-bootstrap/Modal';
import noImg from '../assets/no-image.png'
// import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';
// import { faSort } from '@fontawesome/free-solid-svg-icons';

const ShowData = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState()

  const handleShow = (item) => {
    console.log('✌️item --->', item);
    setShow(true);
    setSelectedData(item)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://6620fdee3bf790e070b177bd.mockapi.io/product/Products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setFilteredData(jsonData); // Initialize filtered data with all products
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter the data based on the search term
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // const filteredPrice = data.filter(itemPrice =>
    //     itemPrice.price.toLowerCase().includes(searchTerm.toLowerCase())

    //   );
    //   const filteredDescription = data.filter(itemDescription =>
    //     itemDescription.description.toLowerCase().includes(searchTerm.toLowerCase())

    //   );
    setFilteredData(filtered);
    // setFilteredData(filteredPrice);
    // setFilteredData(filteredDescription);
  }, [data, searchTerm]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  const handleClose = () => {
    setShow(false);

  }

  const sortedData = () => {
    if (sortConfig.key !== null) {
      const sorted = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      return sorted;
    }
    return filteredData;
  };

  const sortedAndFilteredData = sortedData();


  return (
    <>

      <Navbar />
      <div className="container" style={{}}>
        <InputGroup classNameName="mb-3">
          <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
          <Form.Control
            placeholder="Search Product"
            aria-label="Search Product"
            aria-describedby="basic-addon1"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <br />

        <div className="container">
          <div className="row">
            {sortedAndFilteredData.map((item) => {
              return (
                <div className="col-sm">


                  <Card style={{ width: "18rem", backgroundColor: "gray" }}>
                    <Card.Img variant="top" src={noImg} />
                    <Card.Body>
                      <Card.Title>Product Name:{item.name}</Card.Title>
                      <Card.Text>
                        Product Description:{item.description}
                      </Card.Text>
                      <Card.Text>Product Price:{item.price}</Card.Text>
                      <Button variant="primary" onClick={() => handleShow(item)}>Show</Button>
                    </Card.Body>
                  </Card>

                </div>

              );
            })}
          </div>
          {/* {
            sortedAndFilteredData.map((item) => {
              return ( */}

          {/* )
            })
          } */}

        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Name:{selectedData?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Product Description:{selectedData?.description}<br />
          Product Price:{selectedData?.price}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowData;
