import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";

import { useDispatch, useSelector } from 'react-redux';
import { deleteData, fetchData, updateData, addData } from "../../../store/slice";
import Error from '../../Error/Error';
import { Spinner } from '../../../components';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import useFetch from '../../../utils/fetch';
import { BASE_URL } from '../../../const/data';

const Doctor = () => {
    const { pathname } = useLocation()
    const [editMode, setEditMode] = useState(null);
    const [edit, setEdit] = useState({
        name: "",
        phone: "",
        spec: "",
        birthday: "1970-01-01",
    });
    const [data, setData] = useState({
        name: "",
        phone: "",
        spec: "",
        department: "",
        avatar: "",
        gender: 1,
        region: "",
        district: "",
        education: "",
        family: 1,
        familyphone: "",
        worktime: "",
        birthday: "1970-01-01",
    })

    let accessToken = localStorage.getItem("access_token") || "";

    const { data: department, loading, error: deps } = useFetch("/department", accessToken)
    const dispatch = useDispatch();
    const doctor = useSelector((state) => state.data.data);
    const isLoading = useSelector((state) => state.data.isLoading);
    const error = useSelector((state) => state.data.error);

    useEffect(() => {
        dispatch(fetchData({ apiEndpoint: "doctor", accessToken }));
    }, [dispatch, pathname]);

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const onEditHandler = (e) => {
        setEdit({ ...edit, [e.target.name]: e.target.value });
        console.log({ [e.target.name]: e.target.value });

    };
    const deleteDoctor = (id) => {
        dispatch(deleteData({ apiEndpoint: "doctor", id, accessToken }));
        toast.error("Mahsulot o'chirildi");
    };
    const updateDoctor = (id) => {
        let newData = {
            _id: id,
            ...edit
        };

        dispatch(updateData({ apiEndpoint: "doctor", newData, accessToken }));
        toast.success("Mahsulot muvaffaqiyatli o'zgartirildi!");
    };
    const addDoctor = (e) => {
        e.preventDefault()
        let newData = data;
        console.log(newData);

        dispatch(addData({ apiEndpoint: "doctor", newData, accessToken }));
        toast.success("Mahsulot muvaffaqiyatli qo'shildi!");
    };
    if (isLoading || loading) {
        return <Spinner position={"relative"} />;
    }
    if (error) {
        <Error error={error} />
    }
    if (deps) {
        <Error error={deps} />
    }
    return (
        doctor && department && (
            <section className='pt-[104px]'>
                <div className="max-w-[95%] mx-auto w-full flex items-center justify-between">
                    <h1 className="  text-2xl font-bold text-gray-800 mb-[40px]">
                        Doctors List
                    </h1>
                    <form className='flex'>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-6 py-3 rounded-md focus:outline-none"
                        />
                        <button type="submit" className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                            Search
                        </button>
                    </form>
                </div>
                <div className="relative overflow-x-auto max-w-[95%] mx-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-lg border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white">
                                    User Id
                                </th>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white">
                                    name
                                </th>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white">
                                    phone
                                </th>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white">
                                    department
                                </th>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white">
                                    birthday
                                </th>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white">
                                    spec
                                </th>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white"> actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctor.map((el) => (
                                    <tr key={el._id} className="bg-white border-b border-gray-200">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {el.userId}
                                        </th>
                                        <td className="px-6 py-4">
                                            <input type="text" value={el._id == editMode ? edit.name : el.name} disabled={el._id != editMode} name='name' onChange={onEditHandler} className='border-none focus:ring-1' />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input type="text" value={el._id == editMode ? edit.phone : el.phone} disabled={el._id != editMode} name='phone' onChange={onEditHandler} className='border-none focus:ring-1' />
                                        </td>
                                        <td className="px-6 py-4">
                                            <p>{el?.department?.title}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {el.birthday ?
                                                <input type="date" value={el._id == editMode ? (edit?.birthday ?? el.birthday) : el?.birthday} disabled={el._id != editMode} name='birthday' onChange={onEditHandler} className='border-none focus:ring-1' />
                                                : 'null'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <input type="text" value={el._id == editMode ? edit.spec : (el.spec ?? "")} disabled={el._id != editMode} name='spec' onChange={onEditHandler} className='border-none focus:ring-1' />
                                        </td>
                                        <td className='space-x-[10px]'>
                                            {
                                                editMode != el._id ? (
                                                    <button
                                                        type="button"
                                                        className="focus:outline-none text-white bg-white focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 ring-blue-300 ring-1"
                                                        onClick={() => {
                                                            setEditMode(el._id);
                                                            setEdit({
                                                                name: el.name,
                                                                phone: el.phone,
                                                                spec: el.spec,
                                                                birthday: el.birthday
                                                            })
                                                        }}
                                                    >
                                                        <MdEdit
                                                            style={{ fill: "#00f", fontSize: "20px" }}
                                                        />
                                                    </button>) : (
                                                    <button
                                                        type="button"
                                                        className="focus:outline-none text-white bg-white focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 ring-blue-300 ring-1"
                                                        onClick={() => {
                                                            updateDoctor(el._id);
                                                            setEditMode({
                                                                name: "",
                                                                phone: "",
                                                                spec: "",
                                                                birthday: ""
                                                            });
                                                        }}
                                                    >
                                                        <FaRegSave style={{ fill: "#00f", fontSize: "20px" }} />
                                                    </button>
                                                )
                                            }
                                            <button
                                                type="button"
                                                className="focus:outline-none text-white bg-white focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 ring-red-300 ring-1"
                                                onClick={() => deleteDoctor(el._id)}
                                            >
                                                <MdDeleteOutline
                                                    style={{ fill: "#f00", fontSize: "20px" }}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="max-w-[95%] mx-auto">
                    <form className='flex flex-wrap space-x-[10px] items-center' onSubmit={addDoctor}>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="name">Name</label>
                            <input type="text" value={data.name} onChange={onChangeHandler} id='name' required name='name' className='border rounded-lg focus:ring-1' />
                        </div>

                        <div className="py-4 flex flex-col">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" value={data.phone} onChange={onChangeHandler} id='phone' required name='phone' className='border rounded-lg focus:ring-1' />
                        </div>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="spec">Spec</label>
                            <input type="text" value={data.spec} onChange={onChangeHandler} id='spec' required name='spec' className='border rounded-lg focus:ring-1' />
                        </div>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="department">Department</label>
                            <select name="department" id="department" onChange={onChangeHandler} className='border rounded-lg focus:ring-1' >
                                {
                                    department.map((element) => (
                                        <option key={element._id} value={element._id}>{element.title}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="gender">Gender</label>
                            <select name="gender" id="gender" onChange={onChangeHandler} className='border rounded-lg focus:ring-1' >
                                <option key={0} value={1}>Erkak</option>
                                <option key={1} value={2}>Ayol</option>
                            </select>
                        </div>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="region">Region</label>
                            <input type="text" value={data.region} onChange={onChangeHandler} id='region' required name='region' className='border rounded-lg focus:ring-1' />
                        </div>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="district">District</label>
                            <input type="text" value={data.district} onChange={onChangeHandler} id='district' required name='district' className='border rounded-lg focus:ring-1' />
                        </div>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="education">Education</label>
                            <input type="text" value={data.education} onChange={onChangeHandler} id='education' required name='education' className='border rounded-lg focus:ring-1' />
                        </div>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="family">Family</label>
                            <input type="text" value={data.family} onChange={onChangeHandler} id='family' required name='family' className='border rounded-lg focus:ring-1' />
                        </div>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="familyphone">Family Phone</label>
                            <input type="text" value={data.familyphone} onChange={onChangeHandler} id='familyphone' required name='familyphone' className='border rounded-lg focus:ring-1' />
                        </div>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="worktime">Worktime</label>
                            <input type="text" value={data.worktime} onChange={onChangeHandler} id='worktime' required name='worktime' className='border rounded-lg focus:ring-1' />
                        </div>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="birthday">Birthday</label>
                            <input type="date" value={data.birthday} onChange={onChangeHandler} id='birthday' required name='birthday' className='border rounded-lg focus:ring-1' />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-[100px] mt-6 focus:outline-none text-blue bg-white focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 ring-blue-300 ring-1"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        )
    )

}

export default Doctor