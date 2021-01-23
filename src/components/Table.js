import React from 'react'

const TableHeader = () => {
    return (
        <thead style={{fontWeight:"700"}}>
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
    return (
        <tbody className="">
            <tr>
                <td>Image</td>
                <td>Jim Hudson</td>
                <td>(631)-892-9752</td>
                <td>jum.hudson@example.com</td>
                <td>09-17-1995</td>
            </tr>
            <tr>
                <td>Image</td>
                <td>Jim Hudson</td>
                <td>(631)-892-9752</td>
                <td>jum.hudson@example.com</td>
                <td>09-17-1995</td>
            </tr>
        </tbody>
    )
}


export default function Table() {
    return (
        <table className="table table-hover" style={{"textAlign":"center"}}>
            <TableHeader />
            <TableBody />
        </table>
    )
}
