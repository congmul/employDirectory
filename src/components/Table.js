import React from 'react';
import API from "../utils/API";
import "./Table.css";

// function sortingFunc(props) {
//     console.log("In sorting Func");
//     console.log(props.members);
//     let sortedArr = [...props.members]
//     console.log("In Sorted Arr");
//     console.log(sortedArr.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1));
//     // this.setState({members : sortedArr});
// }

const TableHeader = (props, sortingFunc) => {
    console.log("In Table Header");
    console.log(props.members);
    console.log(props);

    return (
        <thead style={{ fontWeight: "700" }}>
            <tr>
                <th>Image</th>
                <th className="hover" value="name" onClick={ () => props.sortingFunc(props) }>Name</th>
                <th className="hover" value="phone" >Phone</th>
                <th className="hover" value="email" >Email</th>
                <th className="hover" value="dob" >DOB</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {
    console.log("props in Table Body");
    console.log(props.members);
    // props.members.map(object => console.log(object))
    
    return (
        <tbody>
            {props.members.map(object =>
                <tr key={object.id.value}>
                    <td className="align-middle"><img src={object.picture.medium} alt="profile" /></td>
                    <td className="align-middle">{object.name.first} {object.name.last}</td>
                    <td className="align-middle">{object.cell}</td>
                    <td className="align-middle"><a href={`mailto:${object.email}`}>{object.email}</a></td>
                    <td className="align-middle">{new Date(Date.parse(object.dob.date)).toLocaleDateString()}</td>
                </tr>
            )}
        </tbody>
    )
}

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            members: []
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
                    members: res.data.results
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

    sortingFunc(props) {
        console.log("In sorting Func");
        console.log(props.members);
        let sortedArr = [...props.members]
        console.log("In Sorted Arr");
        console.log(sortedArr.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1));
        this.setState({members: sortedArr});
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
                <table className="table table-hover" style={{ "textAlign": "center" }}>
                    <TableHeader members={members} sortingFunc = {this.sortingFunc}/>
                    <TableBody members={members} />
                </table>
            )
        }
    }
}

export default Table
