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
const Rooms = () => {
    const { pathname } = useLocation()
    const [editMode, setEditMode] = useState(null);
    const [edit, setEdit] = useState({
        department: "",
        number: "",
        maxcount: ""
    });
    const [data, setData] = useState({
        department: "",
        number: "",
        maxcount: ""
    })
    let accessToken = localStorage.getItem("access_token") || "";

    const { data: department, loading, error: deps } = useFetch("/department", accessToken)
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.data.data);
    const isLoading = useSelector((state) => state.data.isLoading);
    const error = useSelector((state) => state.data.error);

    useEffect(() => {
        dispatch(fetchData({ apiEndpoint: "room", accessToken }));
    }, [dispatch, pathname]);

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const onEditHandler = (e) => {
        setEdit({ ...edit, [e.target.name]: e.target.value });
        console.log({ [e.target.name]: e.target.value });

    };
    const deleteRoom = (id) => {
        dispatch(deleteData({ apiEndpoint: "room", id, accessToken }));
        toast.error("Mahsulot o'chirildi");
    };
    const updateRoom = (id) => {
        let newData = {
            _id: id,
            ...edit
        };
        console.log(edit);

        dispatch(updateData({ apiEndpoint: "room", newData, accessToken }));
        toast.success("Mahsulot muvaffaqiyatli o'zgartirildi!");
    };
    const addRoom = (e) => {
        e.preventDefault()
        let newData = data;
        dispatch(addData({ apiEndpoint: "room", newData, accessToken }));
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
        rooms && department && (
            <section className='pt-[104px]'>
                <div className="max-w-[95%] mx-auto w-full flex items-center justify-between">
                    <h1 className="  text-2xl font-bold text-gray-800 mb-[40px]">
                        Rooms List
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
                                    department
                                </th>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white">
                                    max count
                                </th>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white">
                                    number
                                </th>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white">
                                    created Time
                                </th>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white"> actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rooms.map((el) => (
                                    <tr key={el._id} className="bg-white border-b border-gray-200">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {el.userId}
                                        </th>
                                        <td className="px-6 py-4">
                                            {
                                                editMode == el._id ? (
                                                    <select name="department" id="department" onChange={onEditHandler} className='border rounded-lg focus:ring-1' >
                                                        {
                                                            department.map((element) => (
                                                                <option key={element._id} value={element._id}>{element.title}</option>
                                                            ))
                                                        }
                                                    </select>) :
                                                    (<input type="text" value={el.department} disabled={el._id != editMode} name='department' onChange={onEditHandler} className='border-none focus:ring-1' />
                                                    )
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            <input type="text" value={el._id == editMode ? edit.maxcount : el.maxcount} disabled={el._id != editMode} name='maxcount' onChange={onEditHandler} className='border-none focus:ring-1' />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input type="text" value={el._id == editMode ? edit.number : el.number} disabled={el._id != editMode} name='number' onChange={onEditHandler} className='border-none focus:ring-1' />
                                        </td>
                                        <td className="px-6 py-4">
                                            {el?.createdTime}
                                        </td>
                                        <td className='space-x-[10px]'>
                                            {
                                                editMode != el._id ? (<button
                                                    type="button"
                                                    className="focus:outline-none text-white bg-white focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 ring-blue-300 ring-1"
                                                    onClick={() => {
                                                        setEditMode(el._id);
                                                        setEdit({
                                                            department: el.department,
                                                            number: el.number,
                                                            maxcount: el.maxcount
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
                                                            updateRoom(el._id);
                                                            setEditMode({
                                                                department: "",
                                                                number: "",
                                                                maxcount: ""
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
                                                onClick={() => deleteRoom(el._id)}
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
                    <form className='flex space-x-[10px] items-center' onSubmit={addRoom}>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="department">Department</label>
                            <select name="department" id="department" onChange={onChangeHandler} className='border rounded-lg focus:ring-1' >
                                {
                                    department.map((element) => (
                                        <option key={element._id} value={element._id}>{element.title}</option>
                                    ))
                                }
                            </select>
                            {/* <input type="text" value={data.department} onChange={onChangeHandler} id='department' required name='department' className='border rounded-lg focus:ring-1' /> */}
                        </div>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="number">Number</label>
                            <input type="text" value={data.number} onChange={onChangeHandler} id='number' required name='number' className='border rounded-lg focus:ring-1' />
                        </div>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="maxcount">Max count</label>
                            <input type="text" value={data.maxcount} onChange={onChangeHandler} id='maxcount' required name='maxcount' className='border rounded-lg focus:ring-1' />
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

export default Rooms