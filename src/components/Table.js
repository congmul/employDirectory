import React from 'react'

const TableHeader = () => {
    return (
        <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>DOB</th>
        </tr>
    )
}

const TableBody = (props) => {
    return (
        <tbody>
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
        <table>
            <TableHeader />
            <TableBody />
        </table>
    )
}
