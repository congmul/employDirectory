import React, { useState } from 'react';
import API from "../utils/API";
import "./Table.css";
import Search from './Search'
import { Modal, Button } from 'react-bootstrap';

const TableHeader = (props, sortingFunc) => {
    console.log("In Table Header");
    console.log(props.members);
    console.log(props);

    return (
        <thead style={{ fontWeight: "700" }}>
            <tr>
                <th>Image</th>
                {/* {console.log(props.sortingOrder)} */}
                {

                    (props.sortingOrder === "descending") ?
                        <th className="hover" value="name" onClick={() => props.sortingFunc(props)}>Name <i className="bi bi-caret-down-fill"></i></th> :
                        ((props.sortingOrder === "ascending") ? <th className="hover" value="name" onClick={() => props.sortingFunc(props)}>Name <i className="bi bi-caret-up-fill"></i></th> :
                            <th className="hover" value="name" onClick={() => props.sortingFunc(props)}>Name </th>)
                }
                <th value="phone" >Phone</th>
                <th value="email" >Email</th>
                <th value="dob" >DOB</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {
    // console.log("props in Table Body");
    // console.log(props.members);
    const [memberSelected, setMemberSelected] = useState({
        gender: "",
        name: {
            first: "",
            last: "",
        },
        location: {
            cyty: "",
            street: {
                name: "",
                number: "",
            },
            coutry: "",
            postcode: "",
            state: "",
        },
        picture: {
            medium: "",
            large:""
        }, 
        dob: {
            age:""
        }
    });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleClick = (e) => {
        console.log(e.target.attributes.memberid.nodeValue);
        let id = e.target.attributes.memberid.nodeValue;
        let aMember = [...props.members];
        let newMember = aMember.filter(member => member.id.value === id);
        // console.log(aMember);
        console.log("================= In Func data ==========================");
        console.log(newMember[0]);
        setMemberSelected({...newMember[0]});
        handleShow()
    } 
    const handleShow = () => {
        console.log("=============== In State data ==========================");
        console.log(memberSelected);
        setShow(true);
    }
    console.log("=============== Out side==========================");
    console.log(memberSelected);
    return (
        <tbody>
            {props.members.map(object =>
                <tr key={object.id.value}>
                    <td className="align-middle"><img src={object.picture.medium} alt="profile" /></td>
                    <td className="align-middle"><Button variant="white" memberid={object.id.value} onClick={handleClick}>{object.name.first} {object.name.last}</Button></td>
                    <td className="align-middle">{object.cell}</td>
                    <td className="align-middle"><a href={`mailto:${object.email}`}>{object.email}</a></td>
                    <td className="align-middle">{new Date(Date.parse(object.dob.date)).toLocaleDateString()}</td>
                </tr>
            )}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{memberSelected.name.first +" "+ memberSelected.name.last}'s profile</Modal.Title>
                </Modal.Header>
                <div className="row">
                    <div className="col-3 mr-3">
                    <Modal.Body><img src={memberSelected.picture.large} alt="profile" /></Modal.Body>
                    </div>
                    <div className="col-8">
                    <Modal.Body>
                        <p>{memberSelected.dob.age} years</p>
                        <p>{memberSelected.email}</p>
                    <p>{memberSelected.location.street.number +" "+memberSelected.location.street.name +" "+ memberSelected.location.city +" "+memberSelected.location.state}</p>
                    </Modal.Body>
                    </div>
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </tbody>
    )
}

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            members: [],
            sortingOrder: "",
            memberForModal: ""
        };
        this.sortingFunc = this.sortingFunc.bind(this);  // Bind function to Class ( It can make sortingFunc use setState )
    }

    componentDidMount() {
        // API of Axios
        API.search()
            .then(res => {
                console.log("Axios");
                console.log(res.data.results);
                this.setState({
                    isLoaded: true,
                    members: res.data.results,
                    searchmember: res.data.results
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    isLoaded: true,
                    err
                })
            });

        // fetch("https://randomuser.me/api/?results=5&nat=us")
        //     .then(res => res.json())
        //     .then((result) => {
        //         // console.log("result.results");
        //         // console.log(result.results);
        //         this.setState({
        //             isLoaded: true,
        //             members: result.results
        //         })
        //     },
        //         (error) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error
        //             })
        //         })
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value.trim();
        console.log(value);
        console.log("this.state.members");
        console.log(this.state.members);
        console.log("this.state.searchmember");
        console.log(this.state.searchmember);
        let members = [...this.state.searchmember];
        this.setState({
            [name]: members.filter(member => (member.name.first + " " + member.name.last).toLowerCase().includes(value.toLowerCase()))
        });
    };

    sortingFunc(props) {
        console.log("In sorting Func");
        console.log(props.members);
        console.log(props.sortingOrder);
        let sortedArr = [...props.members]
        console.log("In Sorted Arr");
        if (props.sortingOrder === "descending") {
            this.setState({ sortingOrder: "ascending" });
            console.log("ascending")
            console.log(sortedArr.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1));
            this.setState({ members: sortedArr, searchmember: sortedArr });
        } else if (props.sortingOrder === "ascending") {
            this.setState({ sortingOrder: "descending" });
            console.log("descending")
            console.log(sortedArr.sort((a, b) => (a.name.first > b.name.first) ? -1 : 1));
            this.setState({ members: sortedArr, searchmember: sortedArr });
        } else {
            this.setState({ sortingOrder: "ascending" });
            console.log("ascending")
            console.log(sortedArr.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1));
            this.setState({ members: sortedArr, searchmember: sortedArr });
        }
    }

    render() {
        const { error, isLoaded, members } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log("members in Table render()")
            console.log(members);
            return (
                <>
                    <Search
                        value={this.state.search}
                        handleInputChange={this.handleInputChange}
                    />
                    <table className="table table-hover" style={{ "textAlign": "center" }}>
                        <TableHeader members={members} sortingFunc={this.sortingFunc} sortingOrder={this.state.sortingOrder} />
                        <TableBody members={members} />
                    </table>
                </>
            )
        }
    }
}

export default Table
