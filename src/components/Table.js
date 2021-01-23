import React from 'react'

const TableHeader = () => {
    return (
        <thead style={{ fontWeight: "700" }}>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>DOB</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {
    console.log("props in Table Body");
    console.log(props.members);
    props.members.map(object => console.log(object))
    
    return (
        <tbody>
            {props.members.map(object =>
                <tr>
                    <td className="align-middle"><img src={object.picture.medium} alt="profile" /></td>
                    <td className="align-middle">{object.name.first} {object.name.last}</td>
                    <td className="align-middle">{object.cell}</td>
                    <td className="align-middle">{object.email}</td>
                    <td className="align-middle">{object.dob.date}</td>
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
    }

    componentDidMount() {
        fetch("https://randomuser.me/api/?results=50&nat=us")
            .then(res => res.json())
            .then((result) => {
                console.log("result.results");
                console.log(result.results);
                this.setState({
                    isLoaded: true,
                    members: result.results
                })
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
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
                    <TableHeader />
                    <TableBody members={members} />
                </table>
            )
        }
    }
}

export default Table
