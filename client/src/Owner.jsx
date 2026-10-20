import { useEffect, useState } from 'react';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";


function Owner() {

    const ptype = {
        "Flat": ["1", "2", "3"],
        "Bungalow": ["5", "10", "15"],
        "Shop": ["0", "1", "2"],
        "Office": ["1", "2", "5"]
    }

    const [property, setproperty] = useState({
        oname: "",
        ptype: "",
        plocation: "",
        nbed: 0,
        ftype: "",
        mrent: 0.0,
        adate: "",
        cno: ""
    })
    const [pros, setpros] = useState([]);
    var url = 'http://localhost:9999';
    const getdata = () => {

        axios.get(url).then((result) => {
            setpros(result.data);
        })
        console.log(pros);


    }

    const addrecord = () => {
        axios.post(url, property).then((result) => {
            // let copyofdata = [...pros];
            // let copyofproperty = { ...property };
            // copyofdata.push(copyofproperty);
            // setpros(copyofdata);
            // setproperty({
            //     oname: "",
            //     ptype: "",
            //     plocation: "",
            //     nbed: 0,
            //     ftype: "",
            //     mrent: 0.0,
            //     adate: "",
            //     cno: ""
            // })
            // console.log('Record added successfully:', result.data);
            if (result.data.affectedRows > 0) {
                alert("submited succesfully");
                getdata();
                setproperty({
                    oname: "",
                    ptype: "",
                    plocation: "",
                    nbed: 0,
                    ftype: "",
                    mrent: 0.0,
                    adate: "",
                    cno: ""
                })
            }

        }).catch((error) => {
            console.error('Error adding record:', error);
        });
    }

    useEffect(() => {
        getdata();
    }, [])
    const deleterecord = (e) => {
        axios.delete(url + `/` + e.oname).then((result) => {
            if (result.data.affectedRows > 0) {

                getdata();

            }
        }).catch((error) => {
            console.error('Error adding record:', error);
        })
           
    }
    const edit = (e) => {
        setproperty(e);
    }
    const update = () => {
        axios.put(url + `/` + property.oname, property).then((result) => {
            if (result.data.affectedRows > 0) {
                alert("updates suceesfully");
                getdata();
                setproperty({
                    oname: "",
                    ptype: "",
                    plocation: "",
                    nbed: 0,
                    ftype: "",
                    mrent: 0.0,
                    adate: "",
                    cno: ""
                })

            }
        })
    }

    const OnTextChange = (args) => {
        let copyofpro = { ...property };
        copyofpro[args.target.name] = args.target.value;
        setproperty(copyofpro);

    }
    const date = new Date().toISOString().split("T")[0];
    const Submit = () => {
        if (property.oname === "" || property.ptype === "" || property.plocation.trim() === "" || Number(property.nbed) === 0 || property.ftype === "" || Number(property.mrent) === 0 || property.adate === "" || Number(property.cno) === 0) {
            alert("please fill all filed!!");

        } else {
            if (!/^[A-Za-z]{1,25}$/.test(property.oname)) {
                alert("owner name must be 25 char!")
            } else if (property.mrent <= 0) {
                alert("rent not negtive nad zero!!!");
            } else if (property.adate < date) {
                alert("date must be valide!!");

            } else if (!/^[0-9]{10}$/.test(property.cno)) {
                alert("number must be 10 digit!!");
            } else {

                addrecord();
                setproperty({
                    oname: "",
                    ptype: "",
                    plocation: "",
                    nbed: 0,
                    ftype: "",
                    mrent: 0.0,
                    adate: "",
                    cno: 0
                })
            }
        }
    }
  
return (
    <div className="container-fluid py-4 bg-light min-vh-100">
        <div className="container">

            {/* Page Heading */}
            <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">
                    Property Management System
                </h2>
                <p className="text-muted">
                    Add, update and manage property details
                </p>
            </div>

            {/* Property Form */}
            <div className="card shadow border-0 mb-5">
                <div className="card-header bg-primary text-white py-3">
                    <h5 className="mb-0">Property Details Form</h5>
                </div>

                <div className="card-body p-4">
                    <div className="row g-3">

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">
                                Owner Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter owner name"
                                name="oname"
                                value={property.oname}
                                onChange={OnTextChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">
                                Property Type
                            </label>
                            <select
                                className="form-select"
                                name="ptype"
                                value={property.ptype}
                                onChange={OnTextChange}
                            >
                                <option value="">Select property type</option>
                                <option value="Flat">Flat</option>
                                <option value="Bungalow">Bungalow</option>
                                <option value="Shop">Shop</option>
                                <option value="Office">Office</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">
                                Property Location
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter property location"
                                name="plocation"
                                value={property.plocation}
                                onChange={OnTextChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">
                                Number of Bedrooms
                            </label>
                            <select
                                className="form-select"
                                name="nbed"
                                value={property.nbed}
                                onChange={OnTextChange}
                                disabled={property.ptype === ""}
                            >
                                <option value="0">Select bedrooms</option>
                                {ptype[property.ptype]?.map((e) => (
                                    <option key={e} value={e}>
                                        {e}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">
                                Furnishing Type
                            </label>
                            <select
                                className="form-select"
                                name="ftype"
                                value={property.ftype}
                                onChange={OnTextChange}
                            >
                                <option value="">Select furnishing type</option>
                                <option value="Furnished">Furnished</option>
                                <option value="Semi-Furnished">
                                    Semi-Furnished
                                </option>
                                <option value="Unfurnished">Unfurnished</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">
                                Monthly Rent (₹)
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter monthly rent"
                                name="mrent"
                                value={property.mrent}
                                onChange={OnTextChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">
                                Available From Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                name="adate"
                                value={property.adate}
                                onChange={OnTextChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">
                                Contact Number
                            </label>
                            <input
                                type="tel"
                                className="form-control"
                                placeholder="Enter 10-digit contact number"
                                name="cno"
                                value={property.cno}
                                onChange={OnTextChange}
                            />
                        </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex flex-wrap gap-2 mt-4">
                        <button
                            type="button"
                            className="btn btn-primary px-4"
                            onClick={() => Submit()}
                        >
                            Submit
                        </button>

                        <button
                            type="button"
                            className="btn btn-success px-4"
                            onClick={() => addrecord()}
                        >
                            Add Details
                        </button>

                        <button
                            type="button"
                            className="btn btn-warning px-4"
                            onClick={() => update()}
                        >
                            Update Details
                        </button>
                    </div>
                </div>
            </div>

            {/* Property Records Table */}
            <div className="card shadow border-0">
                <div className="card-header bg-dark text-white py-3">
                    <h5 className="mb-0">Property Records</h5>
                </div>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered align-middle text-center mb-0">
                            <thead className="table-primary">
                                <tr>
                                    <th>Owner Name</th>
                                    <th>Property Type</th>
                                    <th>Location</th>
                                    <th>Furnishing Type</th>
                                    <th>Bedrooms</th>
                                    <th>Rent (₹)</th>
                                    <th>Available Date</th>
                                    <th>Contact No.</th>
                                    <th>Delete</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pros.map((e) => {
                                    return (
                                        <tr key={e.oname}>
                                            <td>{e.oname}</td>
                                            <td>{e.ptype}</td>
                                            <td>{e.plocation}</td>
                                            <td>{e.ftype}</td>
                                            <td>{e.nbed}</td>
                                            <td>{e.mrent}</td>
                                            <td>{e.adate}</td>
                                            <td>{e.cno}</td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => deleterecord(e)}
                                                >
                                                    Delete
                                                </button>
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => edit(e)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {pros.length === 0 && (
                                    <tr>
                                        <td colSpan="10" className="text-muted py-4">
                                            No property records available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
);


}
export default Owner;